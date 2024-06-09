const express = require("express");
const cors = require("cors");

const imagesRoutes = require("./src/routes/imagesRoutes");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/images", imagesRoutes);

module.exports = app;
