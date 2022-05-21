const express = require("express");
const { loadUsers } = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/load", loadUsers);

module.exports = userRouter;
