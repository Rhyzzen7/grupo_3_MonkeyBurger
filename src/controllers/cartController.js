const path = require("path");

const cartController = {
  // cart: (req, res) => {
  //   res.render("./products/cart");
  // },
  addCart: function (req, res) {
    //  console.log(req.body);
    let product = { ...req.body, total: 0 };
    product.total = parseInt(product.price) * parseInt(product.quantity);
    res.render("./products/cart", { item: product });
  },
};

module.exports = cartController;
