const Router = require("express");
const router = new Router();
const BookingController = require("../controllers/booking-controller");

router.post("/book_tickets", BookingController.bookTickets);
router.get("/bookings_info", BookingController.getBookingsInfo);
router.post("/delete_booking", BookingController.deleteBooking);


module.exports = router;