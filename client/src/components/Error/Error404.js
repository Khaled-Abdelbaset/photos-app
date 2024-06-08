import { Container, Typography, Box } from "@mui/material";

function NotFound() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "gray",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "bold" }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
          The page you are looking for is unavailable.
        </Typography>
      </Box>
    </Container>
  );
}

export default NotFound;
