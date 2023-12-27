const express = require("express");
const app = express();
const morganLogger = require("./loggers/morgan");
const config = require("config");

const LOGGER = config.get("LOGGER");

if (LOGGER === "morgan") {
  app.use(morganLogger);
}
module.exports = app;
