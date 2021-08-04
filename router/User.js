const express = require("express");
const user_controller = require("../controllers/authcontroller");
const router = express.Router();
router.route("/signup").post(user_controller.signup);
router.route("/login").post(user_controller.login);
router.route("/activate/:email/:token").get(user_controller.activate);
router.route("/forgot/:email").get(user_controller.forgetpassword);
router.route("/changepasssword").post(user_controller.changepassword);
module.exports = router;
