const Router = require("express");
const router = new Router();
const PublicController = require("../controllers/public-controller");

router.get("/arrival_points", PublicController.getArrivalPoints);
router.post("/free_seats", PublicController.getFreeSeats);
router.post("/ticket_price", PublicController.getTicketPrice);

module.exports = router;