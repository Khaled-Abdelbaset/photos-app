const { admin } = require("../services/firebase");

const authenticateUser = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: please login first" });
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    });
};

module.exports = { authenticateUser };
