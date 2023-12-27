const lodash = require("lodash");
const handleError = require("../../utils/errorHandler");
const CardModel = require("../modules/mongodb/Card");

const generateBizNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_999_999);
    const card = await CardModel.findOne({ bizNumber: random });
    if (card) return generateBizNumber();
    return random;
  } catch (error) {
    return handleError("GenerateBizNumber", 500, error.message);
  }
};

module.exports = generateBizNumber;
