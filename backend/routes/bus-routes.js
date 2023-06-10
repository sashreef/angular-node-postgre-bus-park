const Router = require("express");
const router = new Router();
const BusController = require("../controllers/bus-controller");


router.post("/add_bus", BusController.addBus);
router.post("/update_bus", BusController.updateBus);
router.post("/delete_bus", BusController.deleteBus);
router.get("/all_buses", BusController.allBuses);

module.exports = router;