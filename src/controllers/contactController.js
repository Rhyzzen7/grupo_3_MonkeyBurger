const path = require("path");

const contactController = {
  contact: function (req, res) {
    res.render("./main/contact");
  },
};

module.exports = contactController;
