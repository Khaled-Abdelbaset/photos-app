const { db } = require("../services/firebase");

const imagesCollection = "favourite images";

exports.checkID = async (req, res, next, val) => {
  try {
    console.log(val);
    const image = await db.collection(imagesCollection).doc(val).get();
    if (!image.exists) {
      return res.status(400).json({
        status: "failed",
        message: "this image doesn't exist in favourites collection",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createImage = async (req, res) => {
  try {
    const { src, photographer } = req.body;
    const image = await db
      .collection(imagesCollection)
      .where("src", "==", src)
      .get();
    if (!image.empty) {
      return res.status(400).json({
        status: "failed",
        message: "this image already in favourites",
      });
    }

    const newImage = { src, photographer };
    const ref = await db.collection(imagesCollection).add(newImage);
    res.status(201).json({ id: ref.id, ...newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    console.log("test");
    const snapshot = await db.collection(imagesCollection).get();
    const images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const imageRef = db.collection(imagesCollection).doc(req.params.id);
    const doc = await imageRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { src, photographer } = req.body;
    const imageRef = db.collection(imagesCollection).doc(req.params.id);
    await imageRef.update({ src, photographer });
    res.status(200).json({ id: req.params.id, src, photographer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const imageRef = db.collection(imagesCollection).doc(req.params.id);
    await imageRef.delete();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
