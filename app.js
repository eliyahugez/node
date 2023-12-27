const express = require("express");
const app = express();
const router = require("./router/router");
const chalk = require("chalk");
const { handleError } = require("./utils/errorHandler");
const cors = require("cors");
const logger = require("./logger/loggerAdapter");
const connectToDB = require("./db/dnService");
const config = require("config");
const {
  generateInitalCards,
  generateInitialUsers,
} = require("./initialData/initalDataService");
const passport = require("passport");
const session = require("express-session");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(logger);

app.use(
  session({
    store: "",
    name: "googleCookie",
    secret: "cats",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = config.get("PORT");
app.listen(PORT, () => {
  console.log(chalk.blue.bold(`server is listening on ${PORT}`));
  connectToDB();

  generateInitalCards();
  generateInitialUsers();
});
