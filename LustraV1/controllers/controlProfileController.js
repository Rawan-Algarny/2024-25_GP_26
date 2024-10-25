const controlProfile = require("../models/controlProfileModel");
/*

exports.updateControlProfile = (req, resp) => {};
*/
exports.createControlProfile = async (req, res) => {
  try {
    const newProfile = await controlProfile.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        profile: newProfile,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
