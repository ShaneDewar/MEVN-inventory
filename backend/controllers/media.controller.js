const db = require("../backend/models/database.js");
const Media = db.media;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const media = new Media({
    title: req.body.title,
    authors: req.body.authors,
    format: req.body.format,
    publish_date: req.body.publish_date,
    date_added: req.body.date_added,
    genres: req.body.genres,
    have_used: req.body.have_used,
    date_last_used: req.body.date_last_used,
    keywords: req.body.keywords,
    languages: req.body.languages,
    isbn: req.body.isbn,
    size: req.body.size,
    notes: req.body.notes,
  });

  media
    .save(media)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the Media.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  // Case insensitive mongo query
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Media.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving all media.",
      });
    });
};
//   // Create new media stub
//   server.post("/create", (req, res) => {
//     const response_data = {
//       id: -1,
//       media: "create_new_stub",
//       summary: "Beep Beep Boop you created a new media.",
//     };
//     res.json(response_data);
//     console.log(req.body.title, req.body.authors);
//     console.log("Media /post create");
//   });

//   // Get all medias
//   server.get("/media", (req, res) => {
//     const response_data = {
//       id: 7,
//       media: "All_medias_phony",
//       summary: "This is a dictionary of all the medias, probably.!.",
//     };
//     res.json(response_data);
//     console.log("All Medias /get");
//   });

//   // Get specific media stub
//   server.get("/media/:id", (req, res) => {
//     const response_data = {
//       id: 1,
//       media: "#1_media_phony_response",
//       summary: "This is the one media you asked for",
//     };
//     res.json(response_data);
//     console.log("Specific Media /get");
//   });

//   // Update specific media
//   server.put("/media/:id", (req, res) => {
//     const response_data = {
//       id: 3,
//       media: "Update media #3",
//       summary: "Okay, media 3 is updated.",
//     };
//     res.json(response_data);
//     console.log("Media /put");
//   });

//   // Delete specific media
//   server.delete("/media/:id", (req, res) => {
//     const response_data = {
//       id: 9,
//       media: "Delete media 9 stub",
//       summary: "Okay, media 9 is deleted.",
//     };
//     res.json(response_data);
//     console.log("Media delete");
//   });
