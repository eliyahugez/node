const express = require("express");
const passport = require("passport");
require("../../auth/googleAuth");
const config = require("config");

const PORT = config.get("PORT");

const router = express.Router();

router.get("/auth", async (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
  });
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.send(
    `<a href="http://localhost:${PORT}/google/auth/google">Authenticate with Google</a>`
  );
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/users/auth/protected",
    failureRedirect: "/google/auth/failure",
  })
);

router.get("/auth/logout", async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.end;
  res.redirect(`http://localhost:${PORT}/users/auth/`);
});

router.get("/auth/failure", async (req, res) => {
  res.send("Failed to authenticate..");
});
// error with worng request
router.use((req, res) =>
  handleError(res, 404, "Page Not Found in google display!")
);

module.exports = router;
