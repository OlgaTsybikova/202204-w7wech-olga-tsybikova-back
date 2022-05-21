const express = require("express");
const { loadUsers, loginUser } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/load", loadUsers);
userRouter.post("/login", loginUser);

module.exports = userRouter;
