const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const { check } = require("express-validator");
let user = "";

const userLoginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Debe especificar un email")
    .bail()
    .isEmail()
    .withMessage("Debe especificar un email váildo")
    .bail()
    .custom((userEmail) => {
      return new Promise((resolve, reject) => {
        db.User.findOne({ where: { email: userEmail } }).then((emailExist) => {
          if (emailExist == null) {
            reject(true);
          } else {
            user = userEmail;
            resolve(true);
          }
        });
      });
    })
    .withMessage("Credenciales inválidas"),
  check("password")
    .notEmpty()
    .withMessage("Debe especificar una contraseña")
    .bail()
    .custom((pass) => {
      return new Promise((resolve, reject) => {
        db.User.findOne({ where: { email: user } }).then((emailExist) => {
          if (bcryptjs.compareSync(pass, emailExist.password)) {
            resolve(true);
          } else {
            reject(true);
          }
        });
      });
    })
    .withMessage("Credenciales inválidas"),
];

module.exports = userLoginValidator;
