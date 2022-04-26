const path = require("path");

const cartController = {
  cart: (req, res) => {
    res.render("./products/cart");
  },
  addCart: function (req, res) {
    console.log(req.body);
    res.render("./products/cart");
  },
};

module.exports = cartController;
