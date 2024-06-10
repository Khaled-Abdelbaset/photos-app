import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavourites } from "../../stores/favouritesSlice";
import { toast } from "react-toastify";

import "../../css/photo.css";

const Image = ({ image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle adding image to favourites
  const handleAddToFavourite = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      // Redirect to sign-in page if user is not authenticated
      navigate("/signin");
      // Show warning toast
      toast.warn("Please Sign in first");
      return;
    }
    try {
      // Dispatch addToFavourites action to add image to favourites
      await dispatch(addToFavourites(image)).unwrap();
      // Show success message
      toast.success("Image Added successfully");
    } catch (error) {
      // Handle errors
      const status = error.status;
      const message = error.data.message;
      switch (status) {
        case 400:
          toast.error(message);
          break;
        default:
          navigate("server-error");
      }
    }
  };

  return (
    // Card component to display the image
    <Card
      className={"add-image"}
      style={{ cursor: "pointer" }}
      onClick={handleAddToFavourite}
    >
      {/* Display image */}
      <CardMedia
        component="img"
        height="250"
        image={image.src.medium}
        alt={image.photographer}
      />
      <CardContent>
        {/* Display photographer name */}
        <Typography variant="subtitle1" style={{ textAlign: "center" }}>
          {image.photographer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Image;
