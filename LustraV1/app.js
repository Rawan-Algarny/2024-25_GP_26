//a convention to include all express configurations here
const express = require("express");
const morgan = require("morgan");
const streetlightRouter = require("./routes/streetlightRoutes");
const controlProfileRouter = require("./routes/controlProfileRoutes");
const path = require("path");
const app = express();
const cors = require("cors"); //to allow cross-origin-requests

app.use(cors());
//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routers
app.use("/streetlights", streetlightRouter);
app.use("/controlProfiles", controlProfileRouter);

module.exports = app;
