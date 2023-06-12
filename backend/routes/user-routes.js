const Router = require("express");
const router = new Router();
const UserController = require("../controllers/user-controller");

router.post("/user_info", UserController.getUserInfo);
router.post("/update_user", UserController.updateUserInfo);
router.post("/delete_user", UserController.deleteUser);
router.post("/all_users", UserController.getAllUser);
router.post("/update_admin", UserController.updateUserForAdmin);
router.post("/create_admin", UserController.signUpUserForAdmin);

module.exports = router;
