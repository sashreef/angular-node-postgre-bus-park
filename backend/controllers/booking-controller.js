const db = require("../db-config");

class BookingController {
  async bookTickets(req, res) {
    const { journey_id, quantity_of_seats } = req.body.bookingData;
    let userId;
    try {
      userId = await db(req.body.role).query(
        `select user_id from Users where login =$1`,
        [req.body.user]
      );
      
    } catch (error) {
      console.log(error);
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`
    const activeStatus = "Active";
    
    let user_id = userId.rows[0].user_id;
    try {
      await db(req.body.role).query(
        `insert into Booking (client_id, journey_id, quantity_of_seats, booking_date, booking_status) values ($1, $2, $3, $4, $5)`,
        [user_id, journey_id, quantity_of_seats, formattedDate, activeStatus]
      );
    } catch (error) {
      console.log(error);
    }
    res.status(201).json();
  }

  async getBookingsInfo(req, res) {
    const login = req.body.user;
        let BookingsInfo;
        try {
          if(req.body.role === 'cashier' || req.body.role === 'administrator')
          {
            BookingsInfo = await db(req.body.role).query(
              `
              SELECT
                booking.booking_id,
                booking.journey_id,
                booking.quantity_of_seats,
                booking.booking_status,
                journey.journey_date,
                timetable.departure_time,
                bus.bus_brand,
                trip.trip_number,
                trip.arrival_point
              FROM
                booking
                JOIN journey ON booking.journey_id = journey.journey_id
                JOIN timetable ON journey.timetable_id = timetable.timetable_id
                JOIN bus ON timetable.bus_id = bus.bus_id
                JOIN trip ON bus.trip_id = trip.trip_id
                JOIN users ON booking.client_id = users.user_id
              ORDER BY booking.booking_id ASC
            `
            );
          }
          else if(req.body.role === 'client'){
            BookingsInfo = await db(req.body.role).query(
              `
              SELECT
                booking.booking_id,
                booking.journey_id,
                booking.quantity_of_seats,
                booking.booking_status,
                journey.journey_date,
                timetable.departure_time,
                bus.bus_brand,
                trip.trip_number,
                trip.arrival_point
              FROM
                booking
                JOIN journey ON booking.journey_id = journey.journey_id
                JOIN timetable ON journey.timetable_id = timetable.timetable_id
                JOIN bus ON timetable.bus_id = bus.bus_id
                JOIN trip ON bus.trip_id = trip.trip_id
                JOIN users ON booking.client_id = users.user_id
              WHERE
                users.login = $1
              ORDER BY journey.journey_date ASC

            `,[login]
            );
          }
        } catch (error) {
            console.error(error);
        }
        res.json(BookingsInfo.rows);
  }

  async deleteBooking(req, res) {
    const booking_id = req.body.booking_id;
    try {
      await db(req.body.role).query(
        `UPDATE booking  SET booking_status = 'Canceled'
        WHERE booking_id = $1`,
        [booking_id]
      );
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Delete error" });
    }
    res.status(201).json();
  }
}
module.exports = new BookingController();