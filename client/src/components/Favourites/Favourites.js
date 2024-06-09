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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(getFavourites());
    } else {
      navigate("/signin");
    }
  }, [dispatch, navigate]);

  return (
    <>
      {status === "failed" && navigate("/server-error")}
      {status === "loading" && (
        <Box
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === "succeeded" && (
        <Container>
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
