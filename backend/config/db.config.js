const credentials = require("../../backend/.secrets.json");

module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@localhost:27017/mern-mongo-db`,
};
