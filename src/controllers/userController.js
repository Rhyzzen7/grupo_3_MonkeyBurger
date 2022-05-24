const { profile } = require("console");
const path = require("path");
const bcryptjs = require("bcryptjs");

<<<<<<< HEAD
const userController = {
=======
const { validationResult } = require("express-validator");

const usersController = {
  login: function (req, res) {
    const openSession = req.body.username;
    //console.log(req.body.username)
    res.render("./users/login");
  },
  register: function (req, res) {
    res.render("./users/register");
  },
>>>>>>> 1d5796f12bf92d370f2d3ef22b9d71030f287ea7
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
