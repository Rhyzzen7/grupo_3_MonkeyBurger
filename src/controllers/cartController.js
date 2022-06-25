const path = require("path");
const fs = require("fs");
const sequelize = require("sequelize");
const db = require("../../database/models");
let carts = require("../../models/cart");
// Esto no deja que nodemon funcione correctamente.
// fs.writeFileSync(path.join(__dirname, "../../data/cart.json"), "", "utf8");

const productsFilePath = path.join(__dirname, "../../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const cartController = {
  cart: function (req, res) {
    // // Leer archivo del carrito
    // let data = fs.readFileSync(
    //   path.join(__dirname, "../../data/cart.json"),
    //   "utf-8"
    // );
    // // Evaluar si existe archivo de carrito
    // if (data === "") {
    //   res.redirect("/");
    // } else {
    //   carts = JSON.parse(data);
    // }
    // console.log(product);
    db.Order_product.findAll({
      include: [
        { model: db.Product, as: "detalle_producto_pedido", where: { id: 2 } },
      ],
    })
      .then((carts) => {
        console.log("Pase por cart");
        res.render("./products/cart", { items: carts });
      })
      .catch((err) => {
        console.log(err);
      });
    // res.render("./products/cart", { items: carts });
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
  // menu: function (req, res) {
  //   // const comboc = products.filter((item) => item.category === "comboc");
  //   // const burgers = products.filter((item) => item.category === "burgers");
  //   // const drinks = products.filter((item) => item.category === "drinks");
  //   // const chips = products.filter((item) => item.category === "chips");

  //   // res.render("./products/menu", { comboc, burgers, drinks, chips });

  //   res.redirect("./products/menu");
  // },
  purchase: function (req, res) {
    // Acá es necesario utilizar el modelo Order para completar la compra
    db.Order_product.findAll({
      include: [
        { model: db.Product, as: "detalle_producto_pedido", where: { id: 2 } },
      ],
    })
      .then((items) => {
        console.log("Pase por purchase");
        console.log(items.length);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = cartController;
