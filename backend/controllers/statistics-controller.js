const db = require("../db-config");

class StatisticsController {

    async busInTrip(req, res) {
        const { bus_number, start_date, end_date } = req.body;
        let result;
        if(end_date < start_date) {
            return res.status(400).json({ error: "End date must be more than start date" });
        }
        try {
            result = await db(req.body.role).query(
                `
                SELECT  SUM(actual_arrival_time - actual_departure_time) AS total_duration
                FROM Journey jr
                INNER JOIN Timetable tt ON tt.timetable_id = jr.timetable_id
                INNER JOIN Bus b ON b.bus_id = tt.bus_id
                    WHERE
                jr.journey_date > $2
                AND jr.journey_date < $3
                AND jr.journey_status = 'Completed'
                AND b.bus_number = $1 
            
            `, [bus_number, start_date, end_date]
            );
            
        res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: `${error}` });
        }
    }

    async sumTicketsOnTrip(req, res) {
        const { trip_number, start_date, end_date } = req.body;
        let result;
        if(end_date < start_date) {
            return res.status(400).json({ error: "End date must be more than start date" });
        }
        try {
            result = await db(req.body.role).query(
                `
                SELECT COUNT(t.trip_id) AS total_tickets_sold
                FROM ticket AS tk
                JOIN journey AS j ON tk.journey_id = j.journey_id
                JOIN timetable AS tt ON j.timetable_id = tt.timetable_id
                JOIN bus AS b ON tt.bus_id = b.bus_id
                JOIN trip AS t ON b.trip_id = t.trip_id
                WHERE t.trip_number = $1
                AND tk.ticket_status = 'Paid'
                AND j.journey_date > $2 
                AND j.journey_date < $3 
            
            `, [trip_number, start_date, end_date]
            );
            
        res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: `${error}` });
        }
    }

    async difBookedAndPaid(req, res) {
        const { trip_number, start_date, end_date } = req.body;
        let result;
        if(end_date < start_date) {
            return res.status(400).json({ error: "End date must be more than start date" });
        }
        try {
            result = await db(req.body.role).query(
                `
                SELECT
                booking_sum - ticket_count  AS ticket_difference
                FROM
                (
                SELECT
                    (
                    SELECT COUNT(tk.ticket_id)
                    FROM Ticket tk
                    INNER JOIN Journey jr ON jr.journey_id = tk.journey_id
                    INNER JOIN Timetable tt ON tt.timetable_id = jr.timetable_id
                    INNER JOIN Bus b ON b.bus_id = tt.bus_id
                    INNER JOIN Trip t ON t.trip_id = b.trip_id
                    WHERE t.trip_number = $1
                    AND jr.journey_date >= $2 AND jr.journey_date <= $3
                    ) AS ticket_count,
                    (
                    SELECT SUM(bk.quantity_of_seats)
                    FROM Booking bk
                    INNER JOIN Journey jr ON jr.journey_id = bk.journey_id
                    INNER JOIN Timetable tt ON tt.timetable_id = jr.timetable_id
                    INNER JOIN Bus b ON b.bus_id = tt.bus_id
                    INNER JOIN Trip t ON t.trip_id = b.trip_id
                    WHERE bk.booking_status = 'Active'
                    AND t.trip_number = $1
                    AND jr.journey_date >= $2 AND jr.journey_date <= $3
                    ) AS booking_sum
                ) AS subquery;
            
            `, [trip_number, start_date, end_date]
            
            );
             res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(400).json({ error: `${error}` });
            console.error(error);
        }
    }

    
}
module.exports = new StatisticsController();