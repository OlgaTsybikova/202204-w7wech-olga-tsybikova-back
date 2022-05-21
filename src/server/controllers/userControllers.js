require("dotenv").config();
const jwt = require("jsonwebtoken");
const debug = require("debug")("social:server:controllers");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const loadUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
    debug("Users request received");
  } catch (error) {
    error.StatusCode = 404;
    error.customMessage = "Not found";
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("There is no user with this name...");
    error.statusCode = 403;
    debug("Error code 403, no user with this name...");
    next(error);
  } else {
    const correctPassword = await bcrypt.compare(password, user.password);

    const userData = {
      username: user.username,
      password: user.password,
      id: user.id,
    };

    if (!correctPassword) {
      const error = new Error("Password is wrong...Please, try again...");
      error.code = 403;
      next(error);
    } else {
      const token = jwt.sign(userData, process.env.JWT_SECRET);
      res.status(200).json({ token });
    }
  }
};
module.exports = { loadUsers, loginUser };
