const config = require("config");

const ENVIROMENT = config.get("NODE_ENV") || "development";

const connectToDB = () => {
  if (ENVIROMENT === "development") require("./dataBases/connectToMongoDb");
  if (ENVIROMENT === "production") require("./dataBases/connectToAtlas");
};

module.exports = connectToDB;
