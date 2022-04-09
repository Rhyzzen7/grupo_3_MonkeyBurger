const path = require("path");

const cartController = {
  cart: (req, res) => {
    res.render("./products/cart")
  }};

module.exports = cartController;
