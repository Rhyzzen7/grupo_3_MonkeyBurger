const path = require("path");

const productsController = {
  productDetail: function (req, res) {
    res.render("./products/productDetail");
  },
  menu: function (req, res) {
    res.render("./products/menu");
  },
  order: function (req, res) {
    res.render("./products/order");
  },
  editProduct: function (req, res) {
    res.render("./products/editProduct");
  },
  newProduct: function (req, res) {
    res.render("./products/newProduct");
  },
};

module.exports = productsController;
