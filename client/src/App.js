import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home/Home";
import Favourites from "./components/Favourites/Favourites";
import NotFound from "./components/Error/Error404";
import InternalServerError from "./components/Error/Error500";
import store from "./stores/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          {/* Routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/server-error" element={<InternalServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {/* Toast container for displaying notifications */}
      <ToastContainer position="top-center" autoClose={1500} />
    </Provider>
  );
}

export default App;
