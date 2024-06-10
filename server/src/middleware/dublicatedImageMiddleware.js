const { db } = require("../services/firebase");

const imagesCollection = "favourite_images";

exports.dublicatedImage = async (req, res, next) => {
  try {
    // Check if the image with the shortened URL already exists in user's favourites
    const image = await db
      .collection(imagesCollection)
      .doc(req.user.uid)
      .collection("images")
      .where("src", "==", req.body.src)
      .get();
    if (!image.empty) {
      return res.status(400).json({
        status: "failed",
        message: "Image already in your favourites",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
