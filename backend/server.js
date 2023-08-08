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

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});