const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
  ISRAELI_PHONE,
  URl,
  EMAIL,
} = require("../../helper/mongooseValidators");
const Address = require("./Address");
const Image = require("./Image");

const Card = new mongoose.Schema(
  {
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: DEFAULT_VALIDATION,
    phone: ISRAELI_PHONE,
    email: EMAIL,
    web: URl,
    address: Address,
    image: Image,
    bizNumber: {
      type: Number,
    },
    user_id: mongoose.Types.ObjectId,
    likes: [String],
  },
  { timestamps: true }
);

const CardModel = mongoose.model("card", Card);

module.exports = CardModel;
