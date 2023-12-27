const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const DB_USER_NAME = config.get("DB_USER_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");
const DB_HOST = config.get("DB_HOST");
const DB_NAME = config.get("DB_NAME");

mongoose
  .connect(`mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
  .then(() => console.log(chalk.magentaBright("Connected to Atlas MongoDB!")))
  .catch((err) =>
    console.log(
      chalk.redBright.bold(`Failed to connect to Atlas MongoDB!,${err}`)
    )
  );
