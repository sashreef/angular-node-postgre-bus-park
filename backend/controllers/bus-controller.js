const db = require("../db-config");

class BusController {

    async allBuses(req, res) {
        let allBuses;
        try {
            allBuses = await db(req.body.role).query(
                `
              SELECT
                bus.bus_id,
                bus.bus_brand,
                bus.bus_number,
                bus.number_of_seats,
                bus.driver_id,
                bus.trip_id
              FROM
                bus
              ORDER BY bus.bus_id ASC

            ` );
        } catch (error) {
            console.error(error);
        }
        res.json(allBuses.rows);
    }

    async addBus(req, res) {
        const { bus_brand, bus_number, number_of_seats, driver_id, trip_id } = req.body;
        let userId;

        try {
            await db(req.body.role).query(
                `insert into Bus (bus_brand, bus_number, number_of_seats, driver_id, trip_id) values ($1, $2, $3, $4, $5)`,
                [bus_brand, bus_number, number_of_seats, driver_id, trip_id]
            );
        } catch (error) {
            console.log(error);
        }
        res.status(201).json();
    }

    async updateBus(req, res) {
        const { bus_id, bus_number, number_of_seats, driver_id, trip_id } = req.body;
        try {
            await db(req.body.role).query(
                `UPDATE Bus  SET bus_number = $2, number_of_seats = $3, driver_id = $4, trip_id = $5
            WHERE bus_id = $1`,
                [bus_id, bus_number, number_of_seats, driver_id, trip_id]
            );
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Update error" });
        }
        res.status(201).json();
    }

    async deleteBus(req, res) {
        const bus_id = req.body.bus_id;
        try {
          await db(req.body.role).query(
            `DELETE FROM ticket WHERE journey_id IN (
              SELECT journey_id FROM journey WHERE timetable_id IN (
                SELECT timetable_id FROM timetable WHERE bus_id = $1
              )
            )`,
            [bus_id]
          );
          await db(req.body.role).query(
            `DELETE FROM booking WHERE journey_id IN (
              SELECT journey_id FROM journey WHERE timetable_id IN (
                SELECT timetable_id FROM timetable WHERE bus_id = $1
              )
            )`,
            [bus_id]
          );
          await db(req.body.role).query(
            `DELETE FROM journey WHERE timetable_id IN (
              SELECT timetable_id FROM timetable WHERE bus_id = $1
            )`,
            [bus_id]
          );
          await db(req.body.role).query(
            `DELETE FROM timetable WHERE bus_id = $1`,
            [bus_id]
          );
          await db(req.body.role).query(
            `DELETE FROM bus WHERE bus_id = $1`,
            [bus_id]
          );
          return res.sendStatus(201);
        } catch (error) {
          console.log(error);
          return res.status(400).json({ error: "Delete error" });
        }
      }
}
module.exports = new BusController();