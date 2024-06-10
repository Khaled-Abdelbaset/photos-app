const express = require("express");
const router = express.Router();
const { shortenAndCreateImage } = require("../controller/shortenController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Route for creating and shortening an image URL
router.post("/", shortenAndCreateImage);

module.exports = router;
