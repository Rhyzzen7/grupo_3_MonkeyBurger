const path = require("path");

const cartController = {
  cart: function (req, res) {
    res.render("./products/cart");
  },
};

module.exports = cartController;
