const express = require("express")
const server = express()

const port = 3033;

// Create new object stub
server.post("/create", (req, res) => {
    const response_data =
    {
        id: -1,
        object: "create_new_stub",
        message: "Beep Beep Boop you created a new object.",
    };
    res.json(response_data);
    console.log(object);
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
    console.log(object);
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
    console.log(object);
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
    console.log(object);
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
    console.log(object);
});


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});