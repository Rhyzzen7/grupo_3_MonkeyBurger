const path = require("path");

const homeController = {
  home: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/main/index.html"));
  },
};

module.exports = homeController;
