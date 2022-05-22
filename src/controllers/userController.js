const { profile } = require("console");
const path = require("path");
const bcryptjs = require("bcryptjs");

const userController = {
  userProfile: function (req, res) {
    res.render("./users/user-profile");
  },
  userCreate: (req,res) => {
    res.render ("/register");

  },

  procesarFormulario: function (req, res) {
    let newUser = {
      id: users.length + 1,
      image: req.file.filename,
      pass : bcryptjs.hashSync(req.body.contrasena,12),
      ...req.body,
    };
    users.push(newUser);
    res.redirect("/users");
  },
};

module.exports = userController;
