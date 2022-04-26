const path = require("path");

const contactController = {
  contact: function (req, res) {
    res.render("./main/contact");
  },
  send: function (req, res) {
    console.log("Datos de contacto enviados");
    res.redirect("/");
  },
};

module.exports = contactController;
