const express = require("express");
const server = express();
const cors = require("cors");

const port = 3033;

var cors_options = {
  origin: ["http://localhost:3033", "http://localhost:5173"],
};

server.use(cors(cors_options));
server.use(express.json());
server.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded coverage.

const db = require("../backend/models/database.js");
db.mongoose
  .connect(db.url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // username: credentials.username,
    // password: credentials.password
  })
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((err) => {
    console.log("Cannot connect to the database.", err);
    process.exit();
  });

// Create new media stub
server.post("/create", (req, res) => {
  const response_data = {
    id: -1,
    media: "create_new_stub",
    summary: "Beep Beep Boop you created a new media.",
  };
  res.json(response_data);
  console.log(req.body.title, req.body.authors);
  console.log("Media /post create");
});

// Get all medias
server.get("/media", (req, res) => {
  const response_data = {
    id: 7,
    media: "All_medias_phony",
    summary: "This is a dictionary of all the medias, probably.!.",
  };
  res.json(response_data);
  console.log("All Medias /get");
});

// Get specific media stub
server.get("/media/:id", (req, res) => {
  const response_data = {
    id: 1,
    media: "#1_media_phony_response",
    summary: "This is the one media you asked for",
  };
  res.json(response_data);
  console.log("Specific Media /get");
});

// Update specific media
server.put("/media/:id", (req, res) => {
  const response_data = {
    id: 3,
    media: "Update media #3",
    summary: "Okay, media 3 is updated.",
  };
  res.json(response_data);
  console.log("Media /put");
});

// Delete specific media
server.delete("/media/:id", (req, res) => {
  const response_data = {
    id: 9,
    media: "Delete media 9 stub",
    summary: "Okay, media 9 is deleted.",
  };
  res.json(response_data);
  console.log("Media delete");
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
