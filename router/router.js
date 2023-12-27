const express = require("express");
const router = express.Router();
const cardsRestController = require("../cards/routes/cardsRestConteroller");
const usersRestController = require("../users/routes/usersRestConteroller");
const googleDisplay = require("../users/routes/googleDisplay");

const handleError = require("../utils/errorHandler");

router.use("/cards", cardsRestController);
router.use("/users", usersRestController);
router.use("/google", googleDisplay);

router.use((req, res) => handleError(res, 404, "Page Not Found!"));

module.exports = router;
