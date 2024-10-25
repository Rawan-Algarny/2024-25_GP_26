const express = require("express");
const streetLightController = require("../controllers/streetLightController");

const router = express.Router();

router
  .route("/")
  .get(streetLightController.getAllStreetlights)
  .post(streetLightController.createStreetlight);

router.route("/:id").patch(streetLightController.changeIsPoweredOn);
module.exports = router;
//router.route("/:id").get(streetLightController.getStreetlight);
