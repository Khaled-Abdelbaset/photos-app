const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config({ path: "./config.env" });

// Import the Express application
const app = require("./app");

// Set the port for the server to listen on, defaulting to 8000
const port = process.env.PORT || 8000;

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
