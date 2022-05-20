require("dotenv").config();
const debug = require("debug")("social:server:controllers");
const User = require("../../database/models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    debug("Users request received");
  } catch (error) {
    error.StatusCode = 404;
    error.customMessage = "Not found";
    next(error);
  }
};

module.exports = { getUsers };
