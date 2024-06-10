const axios = require("axios");
const { db } = require("../services/firebase");

const imagesCollection = "favourite_images";

// Controller function to shorten URL and create a new image in user's favourites
exports.shortenAndCreateImage = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { src, photographer } = req.body;
    
    // Shorten URL using shareaholic
    // const response = await axios.post(
    //   "https://www.shareaholic.com/api/shortener",
    //   { url: src, apikey: "09e1babaaaa3075d34b5e2dfe246ce71" }
    // );
    
    // const shortUrl = response.data.shortUrl;
    
    // Shorten URL using TinyURL API
    const response = await axios.post("https://tinyurl.com/api-create.php", {
      url: src,
    });

    const shortUrl = response.data;

    // Check if the image with the shortened URL already exists in user's favourites
    const image = await db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .where("src", "==", shortUrl)
      .get();
    if (!image.empty) {
      return res.status(400).json({
        status: "failed",
        message: "Image already in your favourites",
      });
    }

    // Create a new image document in user's favourites collection
    const newImage = { src: shortUrl, photographer };
    const ref = await db
      .collection(imagesCollection)
      .doc(userId)
      .collection("images")
      .add(newImage);

    // Return the newly created image data
    res.status(201).json({ id: ref.id, ...newImage });
  } catch (error) {
    // Handle errors if URL shortening or image creation fails
    res.status(500).json({ error: "Failed to shorten URL" });
  }
};
