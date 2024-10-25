const StreetLight = require("../models/streetLightModel");

exports.getAllStreetlights = async (req, res) => {
  try {
    const streetlights = await StreetLight.find(); // Fetch all documents from the "streetlights" collection
    res.json(streetlights); // convert to JSON object
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createStreetlight = async (req, resp) => {
  try {
    const newStreetlight = await StreetLight.create(req.body);
    resp.status(201).json;
    ({
      status: "succes",
      data: {
        streetlight: newStreetlight,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.changeIsPoweredOn = async (req, res) => {
  try {
    const currentstreetlight = await StreetLight.findById(req.params.id);

    if (!currentstreetlight) {
      return res.status(404).json({
        status: "fail",
        message: "Streetlight not found",
      });
    }
    const updatedStreetlight = await StreetLight.findByIdAndUpdate(
      req.params.id,
      {
        isPoweredOn: !currentstreetlight.isPoweredOn,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        streetlight: updatedStreetlight,
      },
    });
    changePowerData(currentstreetlight.controlNodeID); //update in API server
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
