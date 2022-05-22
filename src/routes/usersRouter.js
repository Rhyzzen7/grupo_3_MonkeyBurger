const express = require("express");
const usersRouter = express.Router();

const { check } = require("express-validator");

let validateLogin = [];
let validateRegister = [];
let validateUser = [];

const sessionController = require("../controllers/sessionController");
const userController = require("../controllers/userController");

//Users
// usersRouter.get("/login", sessionController.login);
// usersRouter.get("/register", sessionController.register);
usersRouter.get("/login", userController.login);
usersRouter.get("/register", userController.register);
usersRouter.get("/user", userController.userProfile);

module.exports = usersRouter;
