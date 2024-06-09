const express = require("express");
const router = express.Router();
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
  checkID,
} = require("../controller/imagesController");

router.param("id", checkID);

router.route("/").post(createImage).get(getAllImages);

router.route("/:id").get(getImageById).put(updateImage).delete(deleteImage);

module.exports = router;