import React from "react";
import { Container, Typography, Box } from "@mui/material";

function InternalServerError() {
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
        <Typography variant="h1" sx={{ fontWeight: "bold" }}>
          500
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          Internal Server Error
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
          Something went wrong, Please try again later.
        </Typography>
      </Box>
    </Container>
  );
}

export default InternalServerError;
