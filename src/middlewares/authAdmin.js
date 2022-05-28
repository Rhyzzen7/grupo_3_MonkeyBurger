const bcryptjs = require("bcryptjs");

function authAdmin(req, res, next) {
  //   console.log("pase por admin");
  if (req.session.usuario && req.session.usuario.email === "admin@admin.com") {
    if (bcryptjs.compareSync("admin", req.session.usuario.password)) {
      res.locals.admin = true;
    }
  }

  next();
}

module.exports = authAdmin;
