const express = require("express");
const sinLoginMiddleware = require("../middlewares/sinLoginMiddleware");
const conLoginMiddleware = require("../middlewares/conLoginMiddleware");
const usersRouter = express.Router();
const multer = require("multer");

const { check } = require("express-validator");

let validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email inválido")
    .bail()
    .isEmail()
    .withMessage("Email inválido"),
  check("password")
    .notEmpty()
    .withMessage("Debe especificar una contraseña"),
];
let validateRegister = [];
let validateUser = [];

const sessionController = require("../controllers/sessionController");
const userController = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/img/usuarios"));
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });

//Users
usersRouter.get("/login", sessionController.login);
usersRouter.get("/register", sessionController.register);
usersRouter.post("/register/", upload.single("userimage"), userController.procesarFormulario);
usersRouter.get("/user-Profile", userController.userProfile);
usersRouter.get("/user", userController.userProfile);
// usersRouter.get("/register", sessionController.register);
usersRouter.get("/login", sinLoginMiddleware, userController.showLogin);
usersRouter.get("/logout", conLoginMiddleware, userController.processLogout);
usersRouter.post("/login", sinLoginMiddleware, validateLogin, userController.processLogin);
usersRouter.get("/register", sinLoginMiddleware, userController.register);
usersRouter.get("/", conLoginMiddleware, userController.userProfile);

module.exports = usersRouter;
