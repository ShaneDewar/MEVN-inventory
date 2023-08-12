const express = require("express")
const server = express()

const port = 3033;

// Create new object stub
server.post("/create", (req, res) => {
    const response_data =
    {
        id: -1,
        object: "create_new_stub"
        message: "Beep Beep Boop you created a new object.",
    };
    res.json(response_data);
});

server.get("/server/ax", (req, res) => {
    const response_data =
    {
        message: "Hello Front from AxBack.",
    };
    res.json(response_data);
    console.log("Ax");
});

server.get("/objects/1", (req, res) => {
    const response_data =
    {
        object: "I'm a fancy object in server.js!",
        message: "This is object #1!.",
        id: 1,
    };
    res.json(response_data);
    console.log("1111");
});

server.get("/server/objects/1", (req, res) => {
    const response_data =
    {
        message: "This is object #1, but #2!.",
        id: 1,
    };
    res.json(response_data);
    console.log("1111");
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});