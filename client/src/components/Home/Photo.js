import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import "../../css/photo.css";

const Photo = ({ photo }) => {
  return (
    <Card className="card" style={{ cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="250"
        image={photo.src.medium}
        alt={photo.photographer}
      />
      <CardContent>
        <Typography variant="subtitle1" style={{textAlign: "center"}}>
          {photo.photographer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Photo;
