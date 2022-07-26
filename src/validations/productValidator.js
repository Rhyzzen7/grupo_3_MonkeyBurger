const db = require("../../database/models");
const { check } = require("express-validator");

const productValidator = [
  check("name")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Deberá tener al menos 5 caracteres."),
  check("description")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isLength({ min: 20 })
    .withMessage("Deberá tener al menos 20 caracteres."),
  check("price")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .bail()
    .isNumeric()
    .withMessage("Inserte un valór válido"),
  check("image")
    .custom((value, { req }) => {
      if (req.body.hasFile == undefined) {
        return true;
      }
      const validExt = ["gif", "jpg", "png", "jpeg"];
      const ext = req.file.originalname.split(".").pop();
      if (validExt.indexOf(ext.toLowerCase()) == -1) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Deberá ser un archivo válido (JPG, JPEG, PNG, GIF)"),
];

module.exports = productValidator;
