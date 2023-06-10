const Router = require("express");
const router = new Router();
const DriverController = require("../controllers/driver-controller");


router.post("/add_driver", DriverController.addDriver);
router.post("/update_driver", DriverController.updateDriver);
router.post("/delete_driver", DriverController.deleteDriver);
router.get("/all_drivers", DriverController.allDrivers);

module.exports = router;