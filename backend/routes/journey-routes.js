const Router = require("express");
const router = new Router();
const JourneyController = require("../controllers/journey-controller");


router.post("/add_journey", JourneyController.addJourney);
router.post("/update_journey", JourneyController.updateJourney);
router.post("/delete_journey", JourneyController.deleteJourney);
router.get("/all_journeys", JourneyController.allJourneys);

module.exports = router;