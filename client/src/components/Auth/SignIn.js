import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { TextField, Button, Container, Box } from "@mui/material";

const SignIn = () => {
  // State variables for form fields and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hook for navigation in React Router
  const navigate = useNavigate();

  // Handling form submission
  const handleSignIn = async (e) => {
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
      // Sign-in using Firebase auth
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to home page after successful sign-in
      navigate("/");
    } catch (error) {
      // Handle authentication errors
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;
        case "auth/missing-password":
          setError("Password is required");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/user-disabled":
          setError("User account is disabled");
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
        onSubmit={handleSignIn}
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
          fullWidth
          onFocus={() => setError("")}
          sx={{ marginTop: 2 }}
        />
        {/* Password input field */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          onFocus={() => setError("")}
          sx={{ marginTop: 2 }}
        />
        {/* Sign In button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Sign In
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

export default SignIn;
