const CardModel = require("./mongodb/Card");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await CardModel.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const cards = await CardModel.find({ user_id: userId });
      if (!cards.length === 0)
        throw new Error("Could not find any card in the database");
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};
const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const card = await CardModel.findById(cardId);
      if (!card) throw new Error("Could not find this card in the database");
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};
const createCard = async (noramlizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = await CardModel.findOne({ email: noramlizedCard.email });
      if (card) throw new Error("Cards alerdy exsits");

      card = new CardModel(noramlizedCard);
      await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};

const updateCard = async (cardId, noramlizedCard) => {
  if (DB === "MONGODB") {
    try {
      const card = await CardModel.findByIdAndUpdate(cardId, noramlizedCard, {
        new: true,
      });
      if (!card)
        throw new Error(
          "Could not update this card because a card with this ID cannot be found in the database"
        );
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      const card = await CardModel.findById(cardId);

      if (!card)
        throw new Error(
          "Could not change card likes because a card with this ID cannot be found in the database"
        );
      const cardLikes = card.likes.find((user_Id) => user_Id === userId);

      if (!cardLikes) {
        card.likes.push(userId);
        const cardFromDB = await card.save();
        return Promise.resolve(cardFromDB);
      }

      const cardFiltered = card.likes.filter((id) => id !== userId);
      card.likes = cardFiltered;
      const cardFromDB = await card.save();
      return Promise.resolve(cardFromDB);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};

const removeCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const card = await CardModel.findByIdAndDelete(cardId);
      if (!card)
        throw new Error(
          "Could not delete this card because a card with this ID cannot be found in the database"
        );
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};

const changeBizNumber = async (cardId, NewBizNumber) => {
  if (DB === "MONGODB") {
    try {
      const bizNumber = await CardModel.findOne({ bizNumber: NewBizNumber });
      if (bizNumber) {
        throw new Error(
          "this bizNumber is taken by another business card, please chose another bizNumber"
        );
      }
      const card = await getCard(cardId);
      const cardFromDB = await CardModel.findOneAndUpdate(
        { bizNumber: card.bizNumber },
        { bizNumber: NewBizNumber },
        { new: true }
      );

      return Promise.resolve(cardFromDB);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.removeCard = removeCard;
exports.changeBizNumber = changeBizNumber;
