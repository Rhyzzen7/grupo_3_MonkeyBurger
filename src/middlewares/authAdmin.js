const bcryptjs = require("bcryptjs");
const { application } = require("express");

function authAdmin(req, res, next) {
  if (req.session.usuario && req.session.usuario.role === "admin") {
    // console.log("pase por: " + req.session.usuario.role);
    if (
      req.session.usuario.email === "admin@admin.com" &&
      bcryptjs.compareSync("admin", req.session.usuario.password)
    ) {
      res.locals.admin = true;
      req.app.locals.admin = true;
    }
  } else if (req.session.usuario && req.session.usuario.role === "user") {
    // console.log("pase por: " + req.session.usuario.role);
    res.locals.user = true;
    req.app.locals.user = true;
  }

  next();
}

module.exports = authAdmin;
