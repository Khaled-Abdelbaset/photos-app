import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user's token
      const token = await userCredential.user.getIdToken();

      // Save the token in session storage
      sessionStorage.setItem("token", token);
      
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
        height: "70vh",
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
        <Typography
          variant="h4"
          sx={{ color: "gray", marginBottom: ".5rem", margin: "auto" }}
        >
          Sign In
        </Typography>
        {/* Email input field */}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          onFocus={() => setError("")}
        />
        {/* Password input field */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          onFocus={() => setError("")}
        />
        {/* Sign In button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
        {/* Error message display */}
        {error && (
          <p style={{ color: "red", textTransform: "capitalize", margin: "0", textAlign: "center" }}>
            {error}
          </p>
        )}
      </Box>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Container>
  );
};

export default SignIn;
