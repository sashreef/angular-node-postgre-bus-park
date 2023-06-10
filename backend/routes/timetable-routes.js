const Router = require("express");
const router = new Router();
const TimetableController = require("../controllers/timetable-controller");

router.post("/add_bus", TimetableController.addTimetable);
router.post("/update_bus", TimetableController.updateTimetable);
// router.post("/delete_bus", TimetableController.deleteDriver);
// router.get("/all_buses", TimetableController.allDrivers);

module.exports = router;