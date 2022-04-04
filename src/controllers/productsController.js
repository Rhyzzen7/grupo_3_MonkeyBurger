const path = require("path");

const productsController = {
  productDetail: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/products/productDetail.html"));
  },
  menu: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/products/menu.html"));
  },
  order: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/products/order.html"));
  },
};

module.exports = productsController;
