import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavourites } from "../../stores/favouritesSlice";
import { toast } from "react-toastify";

import "../../css/photo.css";

const Image = ({ image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToFavourite = async () => {
    try {
      await dispatch(addToFavourites(image)).unwrap();
      toast.success("Image Added successfully");
    } catch (error) {
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
    <Card
      className={"add-image"}
      style={{ cursor: "pointer" }}
      onClick={handleAddToFavourite}
    >
      <CardMedia
        component="img"
        height="250"
        image={image.src.medium}
        alt={image.photographer}
      />
      <CardContent>
        <Typography variant="subtitle1" style={{ textAlign: "center" }}>
          {image.photographer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Image;
