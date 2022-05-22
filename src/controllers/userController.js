const path = require("path");

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
  userProfile: function (req, res) {
    res.render("./users/user-profile");
  },
};

module.exports = usersController;
