const bcryptjs = require("bcryptjs");

function adminMiddleware(req, res, next) {
  if (req.session.usuario && req.session.usuario.role === "admin") {
    // console.log("pase por: " + req.session.usuario.role);
    if (
      req.session.usuario.email === "admin@admin.com" &&
      bcryptjs.compareSync("admin", req.session.usuario.password)
    ) {
      next();
    }
  } else {
    return res.redirect("/");
  }
}

module.exports = adminMiddleware;
