const express = require("express");
const path = require("path");
const sinLoginMiddleware = require("../middlewares/sinLoginMiddleware");
const conLoginMiddleware = require("../middlewares/conLoginMiddleware");
const multer = require("multer");
const userController = require("../controllers/userController");
const { check } = require("express-validator");

const usersRouter = express.Router();

let validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email inválido")
    .bail()
    .isEmail()
    .withMessage("Email inválido"),
  check("password").notEmpty().withMessage("Debe especificar una contraseña"),
];

let validateRegister = [
  check("firstname").notEmpty().withMessage("Campo obligatorio"),
  check("lastname").notEmpty().withMessage("Campo obligatorio"),
  check("email")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isEmail()
    .withMessage("Email inválido"),
  check("password").notEmpty().withMessage("Campo obligatorio"),
  check("confirm")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .custom((confirm, { req }) => {
      if (confirm !== req.body.password) {
        throw new Error("La confirmación no coincide");
      }
      return true;
    }),
];

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
usersRouter.get("/login", sinLoginMiddleware, userController.showLogin);
usersRouter.get("/logout", conLoginMiddleware, userController.processLogout);
usersRouter.post(
  "/login",
  sinLoginMiddleware,
  validateLogin,
  userController.processLogin
);
usersRouter.get("/register", sinLoginMiddleware, userController.register);
usersRouter.post(
  "/register/",
  upload.single("userimage"),
  validateRegister,
  userController.procesarFormulario
);
usersRouter.get("/", conLoginMiddleware, userController.userProfile);

module.exports = usersRouter;
