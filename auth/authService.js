const config = require("config");
const { verifyToken } = require("./Providers/jwt");
const handleError = require("../utils/errorHandler");
const handleErrorHttp = require("../utils/handleSendHttps");

const tokenGenerator = config.get("TOKEN_GENERATOR") || jwt;

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const token = req.header("x-auth-token");
      if (!token)
        return handleErrorHttp(res, 401, "Access denied. Please Login");

      const userInfo = verifyToken(token);
      if (!userInfo)
        return handleErrorHttp(res, 401, "Access denied. Please Login");

      req.user = userInfo;
      return next();
    } catch (error) {
      return handleError(res, 500, error.message);
    }
  }
};
module.exports = auth;
