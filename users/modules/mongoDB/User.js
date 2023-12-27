const mongoose = require("mongoose");
const Name = require("./Name");
const {
  ISRAELI_PHONE,
  EMAIL,
} = require("../../../cards/helper/mongooseValidators");
const Address = require("./Address");
const Image = require("./Image");

const User = new mongoose.Schema(
  {
    name: Name,
    phone: ISRAELI_PHONE,
    email: EMAIL,
    password: {
      type: String,
      math: RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*-]).{7,}$"),
    },
    image: Image,
    address: Address,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBusiness: {
      type: Boolean,
      default: false,
    },
    isPasswordErorr: [Number, Date],
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", User);

module.exports = UserModel;
