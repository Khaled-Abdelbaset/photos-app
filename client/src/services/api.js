import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/images";

export const addToFavourite = async (image) => {
  try {
    const response = await axios.post(`${BASE_URL}`, {
      src: image.src,
      photographer: image.photographer,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
