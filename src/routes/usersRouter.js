const express = require("express");
const usersRouter = express.Router();

const sessionController = require("../controllers/sessionController");
const userController = require("../controllers/userController");

//Users
usersRouter.get("/login", sessionController.login);
usersRouter.get("/register", sessionController.register);
usersRouter.get("/user", userController.userProfile);

module.exports = usersRouter;
