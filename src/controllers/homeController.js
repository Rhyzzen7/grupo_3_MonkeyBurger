const path = require("path");
const products = require("../../models/data");

const homeController = {
  home: function (req, res) {
    const news = products.filter((item) => item.category === "news");
    const proms = products.filter((item) => item.category === "proms");
    res.render("./main/index", { news, proms });
  },
};

module.exports = homeController;
