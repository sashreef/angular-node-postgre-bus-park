const Router = require("express");
const router = new Router();
const DriverController = require("../controllers/driver-controller");


router.post("/add_bus", DriverController.addDriver);
router.post("/update_bus", DriverController.updateDriver);
router.post("/delete_bus", DriverController.deleteDriver);
router.get("/all_buses", DriverController.allDrivers);

module.exports = router;