const express = require("express");
const router = express.Router();
const handleError = require("../../utils/errorHandler");
const {
  getCards,
  getMyCards,
  createCard,
  getCard,
  updateCard,
  likeCard,
  removeCard,
  changeBizNumber,
} = require("../modules/cardsAccessData");

const validateCard = require("../validations/cardValidasionService");
const normalizedCard = require("../helper/normalizedcard");
const auth = require("../../auth/authService");

//get all card
router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
//get user cards
router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cards = await getMyCards(userId);
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
//get card by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const card = await getCard(id);
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
//create new card
router.post("/", auth, async (req, res) => {
  try {
    const rawCard = req.body;
    const { isBusiness, _id } = req.user;
    if (!isBusiness)
      return handleError(
        res,
        403,
        "Access denied. you must be an business user"
      );

    const { error } = validateCard(rawCard, _id);
    if (error) return handleError(res, 400, error.details[0].message);

    const card = await normalizedCard(rawCard, _id);
    const cardFormDB = await createCard(card);
    res.send(cardFormDB);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
//edit card by id
router.put("/:id", auth, async (req, res) => {
  try {
    const rawCard = req.body;
    const cardId = req.params.id;
    const userId = req.user._id;

    const cardDormDB = await getCard(cardId);
    const cardUserId = cardDormDB.user_id.toString();

    if (cardUserId !== userId)
      return handleError(
        res,
        403,
        "Access denied. only the user that create the card can edit the card"
      );

    const { error } = validateCard(rawCard);
    if (error) return handleError(res, 400, error.details[0].message);

    const card = await normalizedCard(rawCard, userId);
    const cardFormDB = await updateCard(cardId, card);
    res.send(cardFormDB);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
//like card by id
router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    if (!userId)
      return handleError(
        res,
        403,
        "Access denied. Only logged in user in can like card "
      );

    const card = await likeCard(id, userId);
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
//delete card by id
router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { _id: userId, isAdmin } = req.user;

    const cardDormDB = await getCard(cardId);
    const cardUserId = cardDormDB.user_id.toString();

    if ((userId !== cardUserId) & !isAdmin)
      return handleError(
        res,
        403,
        "Access denied. only the user that create the card or admin user can delete the card "
      );

    const card = await removeCard(cardId);
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
// change bizNumber by id
router.patch("/:bizNumber/:id", auth, async (req, res) => {
  try {
    const { id, bizNumber } = req.params;
    const { isAdmin } = req.user;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Access denied. Only admin user is can to change the biz number "
      );

    const card = await changeBizNumber(id, bizNumber);
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.use((req, res) => handleError(res, 404, "Page Not Found in cards!"));

module.exports = router;
