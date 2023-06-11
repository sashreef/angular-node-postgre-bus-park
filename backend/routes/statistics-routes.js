const Router = require("express");
const router = new Router();
const StatisticsController = require("../controllers/statistics-controller");


router.post("/bus_trip", StatisticsController.busInTrip);
router.post("/ticket_trip", StatisticsController.sumTicketsOnTrip);
router.post("/booked_paid", StatisticsController.difBookedAndPaid);


module.exports = router;