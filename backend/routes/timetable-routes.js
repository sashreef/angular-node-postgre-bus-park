const Router = require("express");
const router = new Router();
const TimetableController = require("../controllers/timetable-controller");

router.post("/add_timetable", TimetableController.addTimetable);
router.post("/update_timetable", TimetableController.updateTimetable);
// router.post("/delete_bus", TimetableController.deleteDriver);
router.get("/all_timetables", TimetableController.allTimetables);

module.exports = router;