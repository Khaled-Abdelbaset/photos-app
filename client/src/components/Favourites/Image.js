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

  const handleDeleteImage = async () => {
    try {
      await dispatch(deleteFavourite(image.id)).unwrap();
      toast.success("Image deleted successfully");
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
    <Card className={""}>
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
