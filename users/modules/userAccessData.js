const { generateAuthToken } = require("../../auth/Providers/jwt");
const { comparePassword } = require("../helper/bcrypt");
const {
  changeUserPasswordError,
  checkUserPasswordError,
} = require("../service/passwordError");
const UserModel = require("./mongoDB/User");
const lodash = require("lodash");

const DB = process.env.DB || "MONGODB";

const register = async (noramlizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = await UserModel.findOne({ email: noramlizedUser.email });
      if (user) throw new Error("User already registered");

      user = UserModel(noramlizedUser);

      await user.save();
      user = lodash.pick(user, ["_id", "name", "email"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user created not in mongodb!");
};
const googleRegister = async (noramlizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = await UserModel.findOne({ email: noramlizedUser.email });
      if (user) return generateAuthToken(user);

      user = UserModel(noramlizedUser);
      await user.save();
      return generateAuthToken(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user created not in mongodb!");
};
const login = async (noramlizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = await UserModel.findOne({ email: noramlizedUser.email });
      if (!user) throw new Error("Invalid email or password");

      if (!user.password)
        throw new Error(
          "You have an account on the site with your Google account, please log in via regeister google user"
        );

      await checkUserPasswordError(user._id, user.isPasswordErorr);

      const isPasswordValid = await comparePassword(
        noramlizedUser.password,
        user.password
      );

      if (!isPasswordValid) {
        await changeUserPasswordError(user._id, user.isPasswordErorr);
      }
      user.isPasswordErorr = [];
      await user.save();

      return generateAuthToken(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user created not in mongodb!");
};
const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await UserModel.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await UserModel.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const user = await UserModel.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      });
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update not in mongodb");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
      const user = await UserModel.findByIdAndUpdate(userId, pipeline, {
        new: true,
      }).select(["-password", "-__v"]);

      if (!user)
        throw new Error(
          "Could not update this user isBusiness status because a user with this ID cannot be found in the database"
        );

      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card liked not in mongodb");
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await UserModel.findByIdAndDelete(userId, {
        password: 0,
        __v: 0,
      });

      if (!user)
        throw new Error(
          "Could not delete this user because a user with this ID cannot be found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
exports.googleRegister = googleRegister;
