const { db } = require("../services/firebase");

const imagesCollection = "favourite_images";

// Middleware to check if image ID exists in user's favourites
exports.checkID = async (req, res, next, val) => {
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

// Create a new image in user's favourites
exports.createImage = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { src, photographer } = req.body;

    // Check if image already exists in favourites
    const image = await db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .where("src", "==", src)
      .get();
    if (!image.empty) {
      return res.status(400).json({
        status: "failed",
        message: "Image already in your favourites",
      });
    }

    const newImage = { src, photographer };
    // Add new image to favourites collection
    const ref = await db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .add(newImage);
    res.status(201).json({ id: ref.id, ...newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all images from user's favourites
exports.getAllImages = async (req, res) => {
  try {
    const userId = req.user.uid;
    // Fetch all images from favourites collection
    const collection = await db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .get();
    const images = collection.docs.map((img) => ({
      id: img.id,
      ...img.data(),
    }));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an image by its ID from user's favourites
exports.getImageById = async (req, res) => {
  try {
    const userId = req.user.uid;
    // Fetch image by ID from favourites collection
    const ref = db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .doc(req.params.id);
    const image = await ref.get();
    if (!image.exists) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json({ id: image.id, ...image.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an image in user's favourites
exports.updateImage = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { src, photographer } = req.body;
    // Update image in favourites collection
    const ref = db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .doc(req.params.id);
    await ref.update({ src, photographer });
    res.status(200).json({ id: req.params.id, src, photographer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an image from user's favourites
exports.deleteImage = async (req, res) => {
  try {
    const userId = req.user.uid;
    // Delete image from favourites collection
    const ref = db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .doc(req.params.id);
    await ref.delete();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
