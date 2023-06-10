const db = require("../db-config");

class PublicController {
    async getArrivalPoints(req, res) {
        let arrivalPoints;
        try {
            arrivalPoints = await db("connect_user").query(
            `select arrival_point from Trip `
          );
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred" }); // Handle the error case
        }
        res.json(arrivalPoints.rows);
    }
    async getTicketPrice(req, res) {
        const { arrival_point} = req.body;
        let TicketPrice;
        try {
            TicketPrice = await db("connect_user").query(
            `select ticket_price from Trip where arrival_point =$1`,
            [arrival_point]
          );
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred" }); // Handle the error case
        }
        res.json(TicketPrice.rows[0]);
    }
    async getFreeSeats(req, res) {
        const { arrival_point, journey_date } = req.body;
        let freeSeats, journey_id, extractedJourneyId;
        try {
            journey_id = await db("connect_user").query(
                `SELECT j.journey_id
            FROM Journey j
            INNER JOIN Timetable t ON t.timetable_id = j.timetable_id
            INNER JOIN Bus b ON b.bus_id = t.bus_id
            INNER JOIN Trip tr ON tr.trip_id = b.trip_id
            WHERE j.journey_date = $1 
              AND tr.arrival_point = $2`,
                [journey_date, arrival_point]
            );
            extractedJourneyId = journey_id.rows[0].journey_id; // Extract the journey_id value
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred" });
        }
        try {
            freeSeats = await db("connect_user").query(
                `SELECT
            jr.journey_id,
            b.number_of_seats - (
                SELECT COUNT(tk.ticket_id)
                FROM Ticket tk
                INNER JOIN Journey jr ON jr.journey_id = tk.journey_id
                INNER JOIN Timetable tt ON tt.timetable_id = jr.timetable_id
                WHERE jr.journey_id = $1
            ) - (
                SELECT SUM(bk.quantity_of_seats)
                FROM Booking bk
                INNER JOIN Journey jr ON jr.journey_id = bk.journey_id
                INNER JOIN Timetable tt ON tt.timetable_id = jr.timetable_id
                WHERE bk.booking_status = 'Active' AND jr.journey_id = $2
            ) AS remaining_seats
            FROM Journey jr
            INNER JOIN Timetable tt ON tt.timetable_id = jr.timetable_id
            INNER JOIN Bus b ON b.bus_id = tt.bus_id
            WHERE jr.journey_id = $1
            GROUP BY jr.journey_id, b.number_of_seats;`,
                [extractedJourneyId, extractedJourneyId] // Pass extracted journey_id as parameter
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred" });
        }
        res.json(freeSeats.rows[0]);
    }
}
module.exports = new PublicController();
