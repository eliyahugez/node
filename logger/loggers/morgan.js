const chalk = require("chalk");
const morgan = require("morgan");
const { loggerToFile } = require("./fileLogger");

const logger = morgan((tokens, req, res) => {
  const date = tokens.date(req, res);
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = tokens.status(req, res);
  const dash = "-";
  const responseTime = tokens["response-time"](req, res);
  const ms = "ms";
  const arr = [date, method, url, status, dash, responseTime, ms];
  if (status >= 400) {
    loggerToFile(status, res.myData.message || "");
    return chalk.redBright(arr.join(" "));
  } else {
    return chalk.cyanBright(arr.join(" "));
  }
});
module.exports = logger;
