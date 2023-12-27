const UserModel = require("../modules/mongoDB/User");
const DB = process.env.DB || "MONGODB";
const twentyFourHours = 24 * 60 * 60 * 1000;

// change status in case of error in the password
const changeUserPasswordError = async (userId, isPasswordErorr) => {
  if (DB === "MONGODB") {
    try {
      //import your user form db
      let user = await UserModel.findById(userId, {
        password: 0,
        __v: 0,
      });
      //There are no errors when trying to log in to the user
      if (isPasswordErorr.length === 0 || isPasswordErorr[0] < 3) {
        user.isPasswordErorr = [(isPasswordErorr[0] || 0) + 1, Date.now()];
        await user.save();
        throw new Error(
          `Invalid email or password, ${
            4 - user.isPasswordErorr[0]
          } more login attempts left`
        );
      }
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card liked not in mongodb");
};

// check status of user for error in the password
const checkUserPasswordError = async (userId, isPasswordErorr) => {
  //import your user form db
  let user = await UserModel.findById(userId, {
    password: 0,
    __v: 0,
  });

  //If there have been more than 3 incorrect login attempts and 24 hours have passed
  if (
    (isPasswordErorr[0] === 3) &
    (Date.now() - isPasswordErorr[1] > twentyFourHours)
  ) {
    user.isPasswordErorr = [];
    await user.save();
    return;
  }
  if (isPasswordErorr[0] < 3 || isPasswordErorr.length === 0) return;

  const timeLeft = Math.round(
    (twentyFourHours - (Date.now() - isPasswordErorr[1])) / (1000 * 60 * 60)
  );
  throw new Error(
    `You have tried to enter an incorrect username or password more than three times, please try again in ${timeLeft} hours   `
  );
};
module.exports = { changeUserPasswordError, checkUserPasswordError };
