const path = require("path");
const fs = require("fs");
let carts = require("../../models/cart");
// Esto no deja que nodemon funcione correctamente.
// fs.writeFileSync(path.join(__dirname, "../../data/cart.json"), "", "utf8");

const productsFilePath = path.join(__dirname, "../../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const cartController = {
  purchase: function (req, res) {
    // Leer archivo del carrito
    let data = fs.readFileSync(
      path.join(__dirname, "../../data/cart.json"),
      "utf-8"
    );
    // Evaluar si existe archivo de carrito
    if (data === "") {
      res.redirect("/");
    } else {
      carts = JSON.parse(data);
    }
    // console.log(product);
    res.render("./products/cart", { items: carts });
  },
  addCart: function (req, res) {
    // Leer archivo del carrito
    let data = fs.readFileSync(
      path.join(__dirname, "../../data/cart.json"),
      "utf-8"
    );
    // Cargar los datos provenientes de la vista order
    let product = {
      name: "",
      image: "",
      price: "",
      category: "",
      quantity: "",
      "extras-1": "",
      "extras-2": "",
      "extras-3": "",
      notes: "",
      total: 0,
      ...req.body,
    };
    product.total = parseInt(product.price) * parseInt(product.quantity);
    // Evaluar si existe archivo de carrito
    if (data === "") {
      carts.push({ id: "1", ...product });
    } else {
      carts = JSON.parse(data);
      carts.push({ id: carts.length + 1, ...product });
    }
    fs.writeFileSync(
      path.join(__dirname, "../../data/cart.json"),
      JSON.stringify(carts),
      "utf8"
    );
    // console.log(product);
    res.render("./products/cart", { items: carts });
  },
  menu: function (req, res) {
    const comboc = products.filter((item) => item.category === "comboc");
    const burgers = products.filter((item) => item.category === "burgers");
    const drinks = products.filter((item) => item.category === "drinks");
    const chips = products.filter((item) => item.category === "chips");

    res.render("./products/menu", { comboc, burgers, drinks, chips });
  },
};

module.exports = cartController;
