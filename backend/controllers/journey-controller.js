const db = require("../db-config");

class JouneyController {

    async allJourneys(req, res) {
        let allJouneys;
        try {
            allJouneys = await db(req.body.role).query(
                `
              SELECT
                journey.journey_id,
                journey.timetable_id,
                journey.actual_departure_time,
                journey.actual_arrival_time,
                journey.journey_status,
                journey.journey_date
              FROM
                booking
              ORDER BY journey.journey_id ASC

            ` );
        } catch (error) {
            console.error(error);
        }
        res.json(allJouneys.rows);
    }

    // async addJourney(req, res) {
    //     const { bus_brand, bus_number, number_of_seats, driver_id, trip_id } = req.body;
    //     let userId;

    //     try {
    //         await db(req.body.role).query(
    //             `insert into Journey (journey_id, timetable_id, actual_departure_time, journey_status, journey_date) values ($1, $2, $3, $4, $5)`,
    //             [bus_brand, bus_number, number_of_seats, driver_id, trip_id]
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     res.status(201).json();
    // }

    async updateJourney(req, res) {
        const { journey_id, actual_departure_time, actual_arrival_time, journey_status } = req.body;
        try {
            await db(req.body.role).query(
                `UPDATE journey  SET actual_departure_time = $2, actual_arrival_time = $3, journey_status = 'Completed'
            WHERE journey_id = $1`,
                [journey_id, actual_departure_time, actual_arrival_time, journey_status]
            );
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Update error" });
        }
        res.status(201).json();
    }

    async cancelJourney(req, res) {
        const { journey_id, journey_status } = req.body;
        try {
            await db(req.body.role).query(
                `UPDATE journey  SET journey_status = 'Canceled'
            WHERE journey_id = $1`,
                [journey_id, journey_status]
            );
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Update error" });
        }
        res.status(201).json();
    }

    async deleteJourney(req, res) {
        const journey_id = req.body.journey_id;
        try {
          await db(req.body.role).query(
            `DELETE FROM ticket WHERE journey_id = $1`,
            [journey_id]
          );
          await db(req.body.role).query(
            `DELETE FROM booking WHERE journey_id = $1`,
            [journey_id]
          );
          await db(req.body.role).query(
            `DELETE FROM journey WHERE journey_id = $1`,
            [journey_id]
          );
          return res.sendStatus(201);
        } catch (error) {
          console.log(error);
          return res.status(400).json({ error: "Delete error" });
        }
      }
}
module.exports = new JouneyController();