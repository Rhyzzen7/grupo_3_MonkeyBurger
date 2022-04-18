const path = require("path");
const products = require("../../models/data");

const productsController = {
  productDetail: function (req, res) {
    const comboc = products.filter((item) => item.category === "comboc");
    const burgers = products.filter((item) => item.category === "burgers");
    const drinks = products.filter((item) => item.category === "drinks");
    const chips = products.filter((item) => item.category === "chips");
    res.render("./products/productDetail", { comboc, burgers, drinks, chips });
  },
  menu: function (req, res) {
    const comboc = products.filter((item) => item.category === "comboc");
    const burgers = products.filter((item) => item.category === "burgers");
    const drinks = products.filter((item) => item.category === "drinks");
    const chips = products.filter((item) => item.category === "chips");
    res.render("./products/menu", { comboc, burgers, drinks, chips });
  },
  order: function (req, res) {
    const comboc = products.filter((item) => item.category === "comboc");
    const burgers = products.filter((item) => item.category === "burgers");
    const drinks = products.filter((item) => item.category === "drinks");
    const chips = products.filter((item) => item.category === "chips");
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
