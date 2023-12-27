const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
} = require("../../../cards/helper/mongooseValidators");

const Address = new mongoose.Schema({
  state: { ...DEFAULT_VALIDATION, required: false },
  country: DEFAULT_VALIDATION,
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: {
    type: Number,
    required: true,
  },
  zip: Number,
});

module.exports = Address;
