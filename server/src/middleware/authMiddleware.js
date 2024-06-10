const { admin } = require("../services/firebase");

// Middleware to authenticate user using Firebase authentication
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] ?? null;

  // Check if token exists in the request headers
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: please login first" });
  }

  // Verify the token
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      // Handle error if token verification fails
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    });
};

module.exports = { authenticateUser };
