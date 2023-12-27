const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb://127.0.0.1:27017/business-card-app")
  .then(() => console.log(chalk.magentaBright("Connected to MongoDB!")))
  .catch((err) =>
    console.log(chalk.redBright.bold(`Failed to connect to MongoDB!,${err}`))
  );
