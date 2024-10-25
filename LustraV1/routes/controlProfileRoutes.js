const express = require("express");
const controlProfileController = require("./../controllers/controlProfileController");
const router = express.Router();
/*
router
  .route("/")
  .post(controlProfileController.createControlProfile)
  .patch(controlProfileController.updateControlProfile);
*/
module.exports = router;
