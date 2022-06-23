const bcryptjs = require("bcryptjs");

function userOrderMiddleware(req, res, next) {
  if (req.session.usuario && req.session.usuario.role === "admin") {
    // console.log("pase por: " + req.session.usuario.role);
    if (
      req.session.usuario.email === "admin@admin.com" &&
      bcryptjs.compareSync("admin", req.session.usuario.password)
    ) {
      next();
    }
  } else if (req.session.usuario && req.session.usuario.role === "user") {
    // console.log("pase por: " + req.session.usuario.role);
    next();
  } else {
    return res.redirect("/users/login");
  }
}

module.exports = userOrderMiddleware;
