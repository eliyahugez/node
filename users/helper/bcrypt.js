const bcrypt = require("bcryptjs");

const generateUserPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = async (password, anotherPassword) => {
  return bcrypt.compareSync(password, anotherPassword);
};

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
