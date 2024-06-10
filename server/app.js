const express = require("express");
const cors = require("cors");

// Import routes for images and URL shortening
const imagesRoutes = require("./src/routes/imagesRoutes");
const shortenRoutes = require("./src/routes/shortenRoutes");

const app = express();

// Enable CORS middleware for handling cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Route handlers for images and URL shortening
app.use("/api/images", imagesRoutes);
app.use("/api/shorten", shortenRoutes);

module.exports = app;
