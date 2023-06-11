const db = require("../db-config");

class TicketController {
    async bookTickets(req, res) {
        const login = req.body.user;
        let BookingsInfo;
        try {
            BookingsInfo = await db(req.body.role).query(
                `
                  SELECT
                    ticket.ticket_id,
                    ticket.journey_id,
                    ticket.ticket_status,
                    journey.journey_date,   
                    trip.arrival_point,
                    users.login
                  FROM
                    ticket
                    JOIN journey ON ticket.journey_id = journey.journey_id
                    JOIN timetable ON journey.timetable_id = timetable.timetable_id
                    JOIN bus ON timetable.bus_id = bus.bus_id
                    JOIN trip ON bus.trip_id = trip.trip_id
                    JOIN users ON ticket.client_id = users.user_id
                  WHERE
                    ticket.ticket_status = 'Unpaid'
                  ORDER BY ticket.ticket_id ASC
                `
            );
        } catch (error) {
            console.error(error);
        }
        res.json(BookingsInfo.rows);
    }

    async sellTicket(req, res) {
        const ticket_id = req.body.ticket_id;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const currentTimeString = hours.toString().padStart(2, '0') + ":" +
            minutes.toString().padStart(2, '0') + ":" +
            seconds.toString().padStart(2, '0');

        try {
            await db(req.body.role).query(
                `UPDATE ticket  SET sale_time = $1, sale_date = $2, ticket_status = 'Paid'
            WHERE ticket_id = $3`,
                [currentTimeString, formattedDate, ticket_id]
            );
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Delete error" });
        }
        res.status(201).json();
    }

    async addTicket(req, res) {
        const { user_id,  trip_id } = req.body.ticketData;
        console.log(req.body);
        let login;
        try {
            login = await db(req.body.role).query(
              `SELECT login  FROM Users 
               WHERE user_id = $1`,
               [user_id]
            );
          
        } catch (error) {
          console.error(error);
        }
        try {
            await db(req.body.role).query(
                `insert into Ticket (client_id, journey_id , ticket_status ) values ($1, $2, 'Unpaid')`,
                [user_id, trip_id]
            );
        } catch (error) {
            console.log(error);
        }
        res.status(201).json();
    }
    
}

module.exports = new TicketController();