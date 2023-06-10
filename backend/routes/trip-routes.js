const Router = require("express");
const router = new Router();
const TripController = require("../controllers/trip-controller");


router.get("/arrival_points", TripController.getArrivalPoints);
router.post("/add_trip", TripController.addTrip);
router.post("/update_trip", TripController.updateTrip);
router.post("/delete_trip", TripController.deleteTrip);
router.get("/all_trips", TripController.allTrips);

module.exports = router;