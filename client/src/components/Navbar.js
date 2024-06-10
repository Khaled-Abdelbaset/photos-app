import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Effect hook to listen for authentication state changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  // Function to handle user sign out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null); // Clear user state
    sessionStorage.clear(); // Clear session storage
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photos App
        </Typography>
        {/* Navigation links */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {/* Conditional rendering based on user authentication state */}
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/favourites">
              Favourites
            </Button>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
