const { db } = require("../services/firebase");

const imagesCollection = "favourite_images";

// Middleware to check if image ID exists in user's favourites
exports.checkIDExistance = async (req, res, next, val) => {
  try {
    const userId = req.user.uid;
    const image = await db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .doc(val)
      .get();
    if (!image.exists) {
      return res.status(400).json({
        status: "failed",
        message: "This image doesn't exist in your favourites collection",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
