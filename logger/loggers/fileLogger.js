const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const loggerToFile = (status, message) => {
  const logStream = fs.createWriteStream(
    path.join(`${__dirname}/logs`, `/${new Date().toDateString()}.log`),
    {
      flags: "a",
    }
  );
  logStream.write(`
  ${new Date().toDateString()}, status - ${status}, error message - ${message}`);
  logStream.end();

  morgan("combined", { stream: logStream });
};

module.exports = { loggerToFile };
