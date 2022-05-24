const path = require("path");

const sessionController = {
  login: function (req, res) {
    const openSession = req.body.username;
    //console.log(req.body.username)
    res.render("./users/login");
  },
  register: function (req, res) {
    res.render("./users/register");
  },
};

module.exports = sessionController;
