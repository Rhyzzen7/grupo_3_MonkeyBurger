const path = require("path");
const { about, markets } = require("../../models/about");

const aboutController = {
  about: function (req, res) {
    res.render("./main/about", { about, markets });
  },
};

module.exports = aboutController;
