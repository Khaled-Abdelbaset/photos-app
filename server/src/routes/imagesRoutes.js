const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const { dublicatedImage } = require("../middleware/dublicatedImageMiddleware");
const { checkIDExistance } = require("../middleware/checkIDMiddleware");
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
} = require("../controller/imagesController");

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Middleware to handle parameter checking for image ID
router.param("id", checkIDExistance);

// Routes for handling image operations
router.route("/").post(dublicatedImage, createImage).get(getAllImages);

// Routes for handling specific image by ID
router.route("/:id").get(getImageById).put(updateImage).delete(deleteImage);

module.exports = router;
