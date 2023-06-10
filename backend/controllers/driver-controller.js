const db = require("../db-config");
const jwt = require("jsonwebtoken");

class DriverController {
  async allDrivers(req, res) {
    const login = req.body.user;
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
            booking
          ORDER BY trip.trip_id ASC

        ` );
    } catch (error) {
      console.error(error);
    }
    res.json(allTrips.rows);
  }


  //Add bus driver
  async addDriver(req, res) {
    const { full_name, passport_id, date_of_birth, phone_number, salary } = req.body;
    let newDriver;
    try {
      newDriver = await db(req.body.role).query(
        `insert into Driver (full_name, passport_id, date_of_birth, phone_number, salary) values ($1, $2, $3, $4, $5)`,
        [full_name, passport_id, date_of_birth, phone_number, salary]
      );
    } catch (err) {
      // newUser = db(req.body.role).query(`select reset_driver_id_seq()`); // decrement user_id to fix serial sequence
      if (err.code == 23505)
        return res.status(409).json({ error: `${err.detail}` });
      // duplicate
      else return res.status(400).json({ error: "bad request" }); // bad request
    }
    res.json(newDriver);
  }
  async updateDriver(req, res) {
    const { passport_id, full_name, phone_number, salary } = req.body;
    let updatedUser;
    try {
      updatedUser = await db(req.body.role).query(
        `UPDATE Users SET full_name = $1, phone_number = $2, salary = $3 WHERE passport_id = $4`,
        [full_name, phone_number, salary, passport_id]
      );
    } catch (error) {
      return res.status(400).json({ error: "Data edit error" });
    }
    res.json(newUser);
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
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Delete error" });
    }
  }

}

module.exports = new DriverController();