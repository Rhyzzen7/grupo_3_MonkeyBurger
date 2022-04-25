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
    res.render("./products/menu", { comboc, burgers, drinks, chips });},
  
  userChoice: function (req, res) {{
   res.send(req.body.userChoice)

  order: function (req, res) {
    // const comboc = products.filter((item) => item.category === "comboc");
    // const burgers = products.filter((item) => item.category === "burgers");
    // const drinks = products.filter((item) => item.category === "drinks");
    // const chips = products.filter((item) => item.category === "chips");
    // res.render("./products/order", { comboc, burgers, drinks, chips });
    const product = products.find((item) => item.id == req.params.id);
    res.render("./products/order", { product });
  },
  editProduct: function (req, res) {
    res.render("./products/editProduct");
  },
  newProduct: function (req, res) {
    res.render("./products/newProduct");
  },
};

module.exports = productsController;
