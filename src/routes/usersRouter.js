const express = require("express");
const path = require("path");
const sinLoginMiddleware = require("../middlewares/sinLoginMiddleware");
const conLoginMiddleware = require("../middlewares/conLoginMiddleware");
const resetDbMiddleware = require("../middlewares/resetDbMiddleware");
const multer = require("multer");
const userController = require("../controllers/userController");
const { check } = require("express-validator");

const userAPI = require("../API/userAPI");

const usersRouter = express.Router();

const validateLogin = require("../validations/userLoginValidator");
const validateRegister = require("../validations/userRegisterValidator");
// let validateLogin = [
//   check("email")
//     .notEmpty()
//     .withMessage("Email inválido")
//     .bail()
//     .isEmail()
//     .withMessage("Email inválido"),
//   check("password").notEmpty().withMessage("Debe especificar una contraseña"),
// ];

// let validateRegister = [
//   check("firstname").notEmpty().withMessage("Campo obligatorio"),
//   check("lastname").notEmpty().withMessage("Campo obligatorio"),
//   check("email")
//     .notEmpty()
//     .withMessage("Campo obligatorio")
//     .bail()
//     .isEmail()
//     .withMessage("Email inválido"),
//   check("password").notEmpty().withMessage("Campo obligatorio"),
//   check("confirm")
//     .notEmpty()
//     .withMessage("Campo obligatorio")
//     .custom((confirm, { req }) => {
//       if (confirm !== req.body.password) {
//         throw new Error("La confirmación no coincide");
//       }
//       return true;
//     }),
// ];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/usuarios"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    req.body.hasFile = true;
    let filetypes = /jpg|jpeg|png|gif/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    // cb(new Error("Invalid IMAGE Type"));
    cb((null, false));
  },
});

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
// usersRouter.get("/reset", resetDbMiddleware, (req, res) => {
//   res.send("Base de datos inicializada.");
// });
usersRouter.get("/api", userAPI.whoAmI);

module.exports = usersRouter;
