const db = require("../models/database.js");
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

// Fiind a specific media by id
exports.findById = (req, res) => {
  const id = req.params.id;

  Media.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Media with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Media with id=" + id });
    });
};
