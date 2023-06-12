const db = require("../db-config");
const jwt = require("jsonwebtoken");

class DriverController {
  async allDrivers(req, res) {
    let allTrips;
    try {
      allTrips = await db(req.body.role).query(
        `
          SELECT
            driver.driver_id,
            driver.full_name,
            driver.passport_id,
            driver.date_of_birth,
            driver.phone_number,
            driver.salary
          FROM
            driver
          ORDER BY driver.driver_id ASC

        ` );
    } catch (error) {
      console.error(error);
    }
    res.json(allTrips.rows);
  }


  //Add bus driver
  async addDriver(req, res) {
    const { full_name, passport_id, date_of_birth, phone_number, salary } = req.body.driverData;
    let newDriver;
    try {
      newDriver = await db(req.body.role).query(
        `insert into Driver (full_name, passport_id, date_of_birth, phone_number, salary) values ($1, $2, $3, $4, $5)`,
        [full_name, passport_id, date_of_birth, phone_number, salary]
      );
    } catch (err) {
      console.log(err);
      if (err.code == 23505)
        return res.status(409).json({ error: `${err.detail}` });
      else return res.status(400).json({ error: "bad request" }); 
    }
    res.status(201).json(newDriver);
  }
  async updateDriver(req, res) {
    const { driver_id, full_name, phone_number, salary } = req.body.driverData;
    let updatedDriver;
    try {
      updatedDriver = await db(req.body.role).query(
        `UPDATE Driver SET full_name = $1, phone_number = $2, salary = $3 WHERE driver_id = $4`,
        [full_name, phone_number, salary, driver_id]
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Data edit error" });
    }
    res.status(201).json(updatedDriver);
  }
  async deleteDriver(req, res) {
    const driver_id = req.body.driver_id;
    try {
      await db(req.body.role).query(
        `DELETE FROM ticket WHERE journey_id IN (
              SELECT journey_id FROM journey WHERE timetable_id IN (
                SELECT timetable_id FROM timetable WHERE bus_id IN (
                  SELECT bus_id FROM bus WHERE driver_id = $1
                )
              )
            )`,
        [driver_id]
      );
      await db(req.body.role).query(
        `DELETE FROM booking WHERE journey_id IN (
              SELECT journey_id FROM journey WHERE timetable_id IN (
                SELECT timetable_id FROM timetable WHERE bus_id IN (
                  SELECT bus_id FROM bus WHERE driver_id = $1
                )
              )
            )`,
        [driver_id]
      );
      await db(req.body.role).query(
        `DELETE FROM journey WHERE timetable_id IN (
              SELECT timetable_id FROM timetable WHERE bus_id IN (
                SELECT bus_id FROM bus WHERE driver_id = $1
              )
            )`,
        [driver_id]
      );
      await db(req.body.role).query(
        `DELETE FROM timetable WHERE bus_id IN (
              SELECT bus_id FROM bus WHERE driver_id = $1
            )`,
        [driver_id]
      );
      await db(req.body.role).query(
        `DELETE FROM bus WHERE driver_id = $1`,
        [driver_id]
      );
      await db(req.body.role).query(
        `DELETE FROM driver WHERE driver_id = $1`,
        [driver_id]
      );
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Delete error" });
    }
  }

}

module.exports = new DriverController();