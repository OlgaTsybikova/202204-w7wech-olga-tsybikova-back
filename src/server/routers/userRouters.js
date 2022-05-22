const express = require("express");
const {
  loadUsers,
  loginUser,
  registerUser,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/load", loadUsers);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

module.exports = userRouter;
