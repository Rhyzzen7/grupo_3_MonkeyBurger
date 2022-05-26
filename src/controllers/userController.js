const path = require("path");
const fs = require("fs");

const { validationResult } = require("express-validator");

const usersFilePath = path.join(__dirname, "../../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {
  showLogin: function (req, res) {
    res.render("./users/login");
  },
  processLogin: function (req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("./users/login", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    const usuario = users.find(
      (u) => u.email === req.body.email && u.password === req.body.password
    );

    if (!usuario) {
      return res.render("./users/login", {
        errors: { login: "Usuario y contraseña inválidos." },
        old: req.body,
      });
    }

    req.session.usuario = usuario;
    if (req.body.rememberme) {
      res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
    }

    res.redirect("./");
  },
  processLogout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    res.redirect("/");
  },
  register: function (req, res) {
    res.render("./users/register");
  },
  userProfile: function (req, res) {
    const usuario = req.session.usuario;
    res.render("./users/user-profile", { usuario });
  },
};

module.exports = usersController;
