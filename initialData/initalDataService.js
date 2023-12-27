const data = require("./initalData.json");
const { createCard } = require("../cards/modules/cardsAccessData");
const normalizedCard = require("../cards/helper/normalizedcard");
const normalizedUser = require("../users/helper/normalizedUser");
const chalk = require("chalk");
const { generateUserPassword } = require("../users/helper/bcrypt");
const { register } = require("../users/modules/userAccessData");
const CardModel = require("../cards/modules/mongodb/Card");
const UserModel = require("../users/modules/mongoDB/User");

const generateInitalCards = async () => {
  const { cards } = data;

  cards.forEach(async (card) => {
    try {
      cardInDb = await CardModel.findOne({ email: card.email });
      if (cardInDb) return;

      const userId = "6376274068d78742d84f31d2";
      card = await normalizedCard(card, userId);
      await createCard(card);
      console.log(chalk.yellow("Inital card created"));
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  });
};

const generateInitialUsers = async () => {
  const { users } = data;
  users.forEach(async (user) => {
    try {
      userInDb = await UserModel.findOne({ email: user.email });
      if (userInDb) return;

      user = await normalizedUser(user);
      user.password = await generateUserPassword(user.password);
      await register(user);
      console.log(chalk.yellow("Inital user created"));
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  });
};

module.exports = { generateInitalCards, generateInitialUsers };
