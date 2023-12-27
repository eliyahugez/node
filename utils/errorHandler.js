const chalk = require("chalk");

const handleError = (res, status, message = "") => {
  res.myData = { message: message };
  console.log(chalk.red.bold(message));
  res.status(status).send(message);
};
module.exports = handleError;
