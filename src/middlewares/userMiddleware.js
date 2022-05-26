const users = require("../../data/users.json");

function userMiddleware(req, res, next) {
  let emailInCookie = req.cookies.userEmail;
  let userFromCookie = users.find((u) => u.email === emailInCookie);
  if (userFromCookie) {
    req.session.usuario = userFromCookie;
  }
  res.locals.tieneSesion = !!req.session.usuario;
  next();
}

module.exports = userMiddleware;
