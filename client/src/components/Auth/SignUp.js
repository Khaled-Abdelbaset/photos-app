import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

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
      toast.success("Account created successfully");
      
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
        height: "70vh",
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
        <Typography
          variant="h4"
          sx={{ color: "gray", marginBottom: "1rem", margin: "auto" }}
        >
          Sign Up
        </Typography>
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
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>

        {/* Error message display */}
        {error && (
          <p
            style={{
              color: "red",
              textTransform: "capitalize",
              margin: "0",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </Box>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Already have an account? <Link to="/signin">Sign in</Link>
      </Typography>
    </Container>
  );
};

export default SignUp;
