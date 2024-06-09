const { db } = require("../services/firebase");

const imagesCollection = "favourite_images";

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

exports.createImage = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { src, photographer } = req.body;
    const image = await db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .where("src", "==", src)
      .get();
    if (!image.empty) {
      return res.status(400).json({
        status: "failed",
        message: "This image already in your favourites",
      });
    }

    const newImage = { src, photographer };
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

exports.getAllImages = async (req, res) => {
  try {
    const userId = req.user.uid;
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

exports.getImageById = async (req, res) => {
  try {
    const userId = req.user.uid;
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

exports.updateImage = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { src, photographer } = req.body;
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

exports.deleteImage = async (req, res) => {
  try {
    const userId = req.user.uid;
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
