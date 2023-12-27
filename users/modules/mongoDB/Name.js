const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
} = require("../../../cards/helper/mongooseValidators");
const Name = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: {
    ...DEFAULT_VALIDATION,
    required: false,
    minlength: 0,
  },
  last: DEFAULT_VALIDATION,
});
module.exports = Name;
