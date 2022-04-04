const path = require("path");

const cartController = {
  cart: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/products/cart.html"));
  },
};

module.exports = cartController;
