const path = require("path");
const { comboc, burgers, drinks, chips } = require("../../models/data");

const productsController = {
  productDetail: function (req, res) {
    res.render("./products/productDetail", { comboc, burgers, drinks, chips });
  },
  menu: function (req, res) {
    res.render("./products/menu", { comboc, burgers, drinks, chips });
  },
  order: function (req, res) {
    res.render("./products/order", { comboc, burgers, drinks, chips });
  },
  editProduct: function (req, res) {
    res.render("./products/editProduct");
  },
  newProduct: function (req, res) {
    res.render("./products/newProduct");
  },
};

module.exports = productsController;
