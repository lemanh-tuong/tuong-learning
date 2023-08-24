var bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("."));

// Simple session handling with a hash of sessions.
var sessions = {};

// A simple API to simulate load in simulated content provided servers.
// Allow express to parse the body of the requests.
app.use(bodyParser.json());

const route = "/";
// Configure servers loads.
app.put(route + "server-loads", function (req, res) {
  var loads = req.body;
  sessions[req.query.session] = loads;
  res.status(201).json(loads);
});

// Query servers loads.
app.get(route + "server-loads", function (req, res) {
  var loads = sessions[req.query.session] || [50, 75, 25];
  res.json(loads);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
