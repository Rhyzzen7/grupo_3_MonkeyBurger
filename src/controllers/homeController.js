const path = require("path");
const { news, proms } = require("../../models/data");

const homeController = {
  home: function (req, res) {
    res.render("./main/index", { news, proms });
  },
};

module.exports = homeController;
