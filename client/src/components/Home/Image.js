import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addToFavourite } from "../../services/api";
import { toast } from "react-toastify";

import "../../css/photo.css";

const Image = ({ image }) => {
  const navigate = useNavigate();
  const handleAddToFavourite = async () => {
    try {
      await addToFavourite(image);
      toast.success("Image Added successfully");
      } catch (error) {
        const status = error.response.status;
        const message = error.response.data.message;
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
