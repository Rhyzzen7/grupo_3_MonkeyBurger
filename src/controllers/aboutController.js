const path = require("path");

const aboutController = {
  about: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/main/about.html"));
  },
};

module.exports = aboutController;
