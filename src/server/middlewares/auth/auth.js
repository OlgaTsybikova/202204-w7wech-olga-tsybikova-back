require("dotenv").config();
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const debug = require("debug")("social:server:middlewares:auth");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization.includes("Bearer ")) {
      throw new Error();
    }
    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch {
    debug(chalk.red("Invalid token"));
    const customError = new Error("Invalid token here");
    customError.statusCode = 401;

    next(customError);
  }
};

module.exports = auth;
