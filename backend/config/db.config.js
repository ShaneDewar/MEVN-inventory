const credentials = require("../../backend/.secrets.json");

module.exports = {
    url: `mongodb://${credentials.user}:${credentials.password}@127.0.0.1:27017/mern-mongo-db`
};