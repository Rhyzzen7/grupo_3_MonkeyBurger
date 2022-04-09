const path = require("path");

const aboutController = {
  about: function (req, res) {
    res.render("./main/about");
  },
};

module.exports = aboutController;
