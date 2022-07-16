const db = require("../../database/models");
const { check } = require("express-validator");

const userRegisterValidator = [
  check("firstname")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Ingresar al menos 2 caracteres"),
  check("lastname")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Ingresar al menos 2 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isEmail()
    .withMessage("Email inválido")
    .bail()
    // .custom((value) => {
    //   console.log("buscando email");
    //   db.User.findOne({
    //     where: {
    //       email: value,
    //     },
    //   }).then((user) => {
    //     if (user) {
    //       // throw new Error("El email se encuentra registrado en la db");
    //       console.log("email is: " + user.email);
    //       stateEmail = true;
    //     } else {
    //       console.log("email is available");
    //       stateEmail = false;
    //     }
    //   });
    //   // console.log("\n" + users + "\n");
    //   // console.log("State is: " + exist);
    //   console.log(stateEmail ? true : false);
    //   return stateEmail;
    // })
    .custom((userEmail) => {
      return new Promise((resolve, reject) => {
        db.User.findOne({ where: { email: userEmail } }).then((emailExist) => {
          if (emailExist !== null) {
            reject(true);
          } else {
            resolve(true);
          }
        });
      });
    })
    .withMessage("El email se encuentra registrado en la db"),
  check("userimage")
    .custom((value, { req }) => {
      const validExt = ["gif", "jpg", "png", "jpeg"];
      const ext = req.file.originalname.split(".").pop();
      if (validExt.indexOf(ext.toLowerCase()) == -1) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Deberá ser un archivo válido (JPG, JPEG, PNG, GIF)"),
  check("password")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener al menos 8 caracteres")
    .bail()
    .custom((value) =>
      value.match(/[a-z]+/) &&
      value.match(/[A-Z]+/) &&
      value.match(/[0-9]+/) &&
      value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)
        ? true
        : false
    )
    .withMessage(
      "Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial"
    ),
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

module.exports = userRegisterValidator;
