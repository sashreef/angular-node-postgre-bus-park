const db = require("../db-config");

class TripController {
  async getArrivalPoints(req, res) {
    let arrivalPoints;
    try {
      arrivalPoints = await db(req.body.role).query(
        `select arrival_point from Trip `
      );
    } catch (error) {
      console.log(err);
    }
    res.json(arrivalPoints);
  }

  async allTrips(req, res) {
    const login = req.body.user;
        let allTrips;
        try {
          allTrips = await db(req.body.role).query(
              `
              SELECT
                trip.trip_id,
                trip.trip_number,
                trip.arrival_point,
                trip.ticket_price
              FROM
                trip
              ORDER BY trip.trip_id ASC

            ` );
        } catch (error) {
            console.error(error);
        }
        res.json(allTrips.rows);
  }

  async addTrip(req, res) {
    const { trip_number, arrival_point, ticket_price } = req.body;
    let userId;

    try {
      await db(req.body.role).query(
        `insert into Trip (trip_number, arrival_point, ticket_price) values ($1, $2, $3)`,
        [trip_number, arrival_point, ticket_price]
      );
    } catch (error) {
      console.log(error);
    }
    res.status(201).json();
  }

  async updateTrip(req, res) {
    const { trip_number, ticket_price } = req.body;
    try {
      await db(req.body.role).query(
        `UPDATE trip  SET trip_number = $2, ticket_price = $3
            WHERE trip_id = $1`,
        [trip_number, ticket_price]
      );
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Delete error" });
    }
    res.status(201).json();
  }

  async deleteTrip(req, res) {
    const trip_id = req.body.trip_id;
    try {
      await db(req.body.role).query(
        `DELETE FROM ticket WHERE journey_id IN (
                SELECT journey_id FROM journey WHERE timetable_id IN (
                  SELECT timetable_id FROM timetable WHERE bus_id IN (
                    SELECT bus_id FROM bus WHERE trip_id = $1
                  )
                )
              )
            )`,
        [trip_id]
      );
      await db(req.body.role).query(
        `DELETE FROM booking WHERE journey_id IN (
              SELECT journey_id FROM journey WHERE timetable_id IN (
                SELECT timetable_id FROM timetable WHERE bus_id IN (
                  SELECT bus_id FROM bus WHERE trip_id = $1
                )
              )
            )`,
        [trip_id]
      );
      await db(req.body.role).query(
        `DELETE FROM journey WHERE timetable_id IN (
              SELECT timetable_id FROM timetable WHERE bus_id IN (
                SELECT bus_id FROM bus WHERE trip_id = $1
              )
            )`,
        [trip_id]
      );
      await db(req.body.role).query(
        `DELETE FROM timetable WHERE bus_id IN (
              SELECT bus_id FROM bus WHERE trip_id = $1
            )`,
        [trip_id]
      );
      await db(req.body.role).query(
        `DELETE FROM bus WHERE trip_id = $1`,
        [trip_id]
      );
      await db(req.body.role).query(
        `DELETE FROM trip WHERE trip_id = $1`,
        [trip_id]
      );
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Delete error" });
    }
  }
}
module.exports = new TripController();
