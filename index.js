// Dependencies
// =============================================================
let express = require("express");
let path = require("path");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// teams and waitlists
// =============================================================
let teams = [];
let waitLists = [];
const maxReservation = 5;


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/index.html"));
});

app.get("/teams", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/viewteams.html"));
});

app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/creation.html"));
});

// Return your teams Array object
app.get("/api/teams", function(req, res) {
  return res.json(teams);
});

// Return your waitLists Array object 
app.get("/api/waitlist", function(req, res) {
  return res.json(waitLists);
});

// Create New teams - takes in JSON input
app.post("/api/teams", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newReservation = req.body;
  console.log(newReservation);

  if (teams.length < maxReservation)
    teams.push(newReservation);
  else 
    waitLists.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`App listening on http://localhost:${PORT}`);
});
