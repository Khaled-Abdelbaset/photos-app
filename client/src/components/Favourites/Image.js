import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFavourite } from "../../stores/favouritesSlice";
import { toast } from "react-toastify";

const Image = ({ image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle deletion of the image
  const handleDeleteImage = async () => {
    try {
      // Dispatch deleteFavourite action to delete the image
      await dispatch(deleteFavourite(image.id)).unwrap();
      // Show success message
      toast.success("Image deleted successfully");
    } catch (error) {
      // Handle errors
      const status = error.status;
      const message = error.data.message;
      switch (status) {
        case 400:
          toast.error(message);
          break;
        default:
          // Redirect to server error page for other errors
          navigate("server-error");
      }
    }
  };

  return (
    // Card component to display the image
    <Card>
      {/* Display image */}
      <CardMedia
        component="img"
        height="250"
        image={image.src}
        alt={image.photographer}
      />
      <CardContent>
        {/* Display photographer name */}
        <Typography variant="subtitle1" style={{ textAlign: "center" }}>
          {image.photographer}
        </Typography>
        {/* Button to delete image */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: "#dc3545",
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
          onClick={handleDeleteImage}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Image;
