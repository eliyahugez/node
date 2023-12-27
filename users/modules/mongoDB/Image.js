const mongoose = require("mongoose");
const {
  URl,
  DEFAULT_VALIDATION,
} = require("../../../cards/helper/mongooseValidators");

const Image = new mongoose.Schema({
  url: URl,
  alt: {
    ...DEFAULT_VALIDATION,
    required: false,
  },
});

module.exports = Image;
