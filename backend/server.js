const express = require("express")
const server = express()
const cors = require("cors");
const credentials = require("./secrets.js");

const port = 3033;

var cors_options = {
    origin: ["http://localhost:3033", "http://localhost:5173"]
};

server.use(cors(cors_options));
server.use(express.json());

const db = require("../backend/models/database.js");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        username: credentials.username,
        password: credentials.password
    }).then(() => {
        console.log("Connected to the database.");
    }).catch(err => {
        console.log("Cannot connect to the database.", err);
        process.exit();
    });

// Create new object stub
server.post("/create", (req, res) => {
    const response_data =
    {
        id: -1,
        object: "create_new_stub",
        message: "Beep Beep Boop you created a new object.",
    };
    res.json(response_data);
    console.log("Object /post create");
});

// Get all objects
server.get("/object", (req, res) => {
    const response_data =
    {
        id: 7,
        object: "All_objects_phony",
        message: "This is a dictionary of all the objects, probably.!.",

    };
    res.json(response_data);
    console.log("All Objects /get");
});

// Get specific object stub
server.get("/object/:id", (req, res) => {
    const response_data =
    {
        id: 1,
        object: "#1_object_phony_response",
        message: "This is the one object you asked for",

    };
    res.json(response_data);
    console.log("Specific Object /get");
});

// Update specific object
server.put("/object/:id", (req, res) => {
    const response_data =
    {
        id: 3,
        object: "Update object #3",
        message: "Okay, object 3 is updated.",

    };
    res.json(response_data);
    console.log("Object /put");
});

// Delete specific object
server.delete("/object/:id", (req, res) => {
    const response_data =
    {
        id: 9,
        object: "Delete object 9 stub",
        message: "Okay, object 9 is deleted.",

    };
    res.json(response_data);
    console.log("Object delete");
});


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});