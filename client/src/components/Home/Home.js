import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImages } from "../../stores/imagesSlice";
import Image from "./Image";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  const status = useSelector((state) => state.images.status);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Fetch images
  useEffect(() => {
    dispatch(getImages(page));
  }, [dispatch, page]);

  // Handle server error and redirect to error page
  useEffect(() => {
    if (status === "failed") {
      navigate("/server-error");
    }
  }, [status, navigate]);

  return (
    <>
      {/* Display loading spinner when fetching images */}
      {status === "loading" && (
        <Box
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <CircularProgress />
        </Box>
      )}
      {/* Display images when fetching is successful */}
      {status === "succeeded" && (
        <Container>
          {/* Grid to display images */}
          <Grid container spacing={3} style={{ padding: 20 }}>
            {images.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Image image={image} />
              </Grid>
            ))}
          </Grid>
          {/* Navigation buttons */}
          <Box style={{ textAlign: "center", margin: 20 }}>
            <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              ⬅
            </IconButton>
            <IconButton
              onClick={() => setPage(page + 1)}
              disabled={images.length === 0}
            >
              ➡
            </IconButton>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Home;
