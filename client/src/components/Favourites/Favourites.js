import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../../stores/favouritesSlice";
import Image from "../Favourites/Image";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const status = useSelector((state) => state.favourites.status);
  const navigate = useNavigate();

  // Fetch favourite images
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(getFavourites());
    } else {
      // Redirect to sign-in page if token not exist
      navigate("/signin");
    }
  }, [dispatch, navigate]);

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
      {/* Display favourites when images fetching is successful */}
      {status === "succeeded" && (
        <Container>
          {/* Show message when no favourite images */}
          {favourites.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Typography variant="h4" color="textSecondary">
                No Images In Your Favourites
              </Typography>
            </Box>
          ) : (
            // Display favourite images
            <Grid container spacing={3} sx={{ padding: 2 }}>
              {favourites.map((favourite) => (
                <Grid item xs={12} sm={6} md={4} key={favourite.id}>
                  <Image image={favourite} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </>
  );
};

export default Favourites;
