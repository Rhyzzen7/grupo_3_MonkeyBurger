const path = require("path");

const cartController = {
  cart: (req, res) => {
    res.render("./products/cart");
  },
  addCart: function (req, res) {
    console.log("agregado al carrito" + req.body);
    res.redirect("./products/cart");
  },
};

module.exports = cartController;
