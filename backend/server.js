const express = require("express")
const server = express()

const port = 3033;

server.get("/server", (req, res) => {
    const response_data =
    {
        message: "Hello Front from Back.",
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
        message: "This is object #1!.",
        id: 1,
    };
    res.json(response_data);
    console.log("1111");
});


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});