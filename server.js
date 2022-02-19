// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Require Cors
const cors = require("cors");
// Require bodyParser
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//create get route endpoint
app.get("/getALLDate", (req, res) => {
  res.status(200).send(projectData);
});
//create post route endpoint
app.post("/addALLData", (req, res) => {
  projectData = req.body;
  res.status(200).send(projectData);
});

// Setup Server
//port number
const port = 8000;
const hostname = "127.0.0.1";
app.listen(port, () => {
  console.log(`your server is running at  http://${hostname}:${port}/`);
});
