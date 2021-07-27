const express = require("express");
const data_controller=require("../controllers/data");
const router = express.Router();
router.route("/").post(data_controller.make).get(data_controller.get);
router.route("/:id").get(data_controller.getone);
module.exports=router;