import React from "react";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home/Home";
import NotFound from "./components/Error/Error404";
import InternalServerError from "./components/Error/Error500";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/server-error" element={<InternalServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
