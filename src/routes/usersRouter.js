const express = require("express");
const usersRouter = express.Router();
const multer = require("multer");

const { check } = require("express-validator");

let validateLogin = [];
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
<<<<<<< HEAD
usersRouter.get("/login", sessionController.login);
usersRouter.get("/register", sessionController.register);
usersRouter.post("/register/", upload.single("userimage"), userController.procesarFormulario);
usersRouter.get("/user-Profile", userController.userProfile);
=======
// usersRouter.get("/login", sessionController.login);
// usersRouter.get("/register", sessionController.register);
usersRouter.get("/login", userController.login);
usersRouter.get("/register", userController.register);
>>>>>>> 1d5796f12bf92d370f2d3ef22b9d71030f287ea7
usersRouter.get("/user", userController.userProfile);

module.exports = usersRouter;
