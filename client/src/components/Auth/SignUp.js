import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { TextField, Button, Container, Box } from "@mui/material";

const SignUp = () => {
  // State variables for form fields and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hook for navigation in React Router
  const navigate = useNavigate();

  // Handling form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validations for email and password
    if (!email) {
      setError("Please enter a valid email address");
      return;
    } else if (!password) {
      setError("Please enter a valid password");
      return;
    }

    try {
      // Sign-up using Firebase auth
      await createUserWithEmailAndPassword(auth, email, password);

      // Navigate to sign-in page after successful sign-up
      navigate("/signin");
    } catch (error) {
      // Handle authentication errors
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/weak-password":
          setError("Password is too weak");
          break;
        case "auth/missing-password":
          setError("Password is required");
          break;
        case "auth/email-already-in-use":
          setError("Email address already exists");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        default:
          // Navigate to server error page
          navigate("/server-error");
      }
    }
  };

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
        component="form"
        onSubmit={handleSignUp}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Email input field */}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setError("")}
          fullWidth
        />
        {/* Password input field */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setError("")}
          fullWidth
        />
        {/* Sign Up button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>
      {/* Error message display */}
      {error && (
        <Box sx={{ color: "red", textTransform: "capitalize" }}>
          <p>{error}</p>
        </Box>
      )}
    </Container>
  );
};

export default SignUp;
