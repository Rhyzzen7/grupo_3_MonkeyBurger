const fs = require("fs");
const path = require("path");
const sequelize = require("sequelize");
const db = require("../../database/models");

//Lectura de datos para la carga inicial de la db
const productsFilePath = path.join(__dirname, "../../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


//Funtion to update products.json
function storeProducts(products) {
  const productTransformer = JSON.stringify(products);
  fs.writeFileSync(productsFilePath, productTransformer);
}

const productsController = {
  productDetail: function (req, res) {
    const comboc = products.filter((item) => item.category === "comboc");
    const burgers = products.filter((item) => item.category === "burgers");
    const drinks = products.filter((item) => item.category === "drinks");
    const chips = products.filter((item) => item.category === "chips");
    res.render("./products/productDetail", { comboc, burgers, drinks, chips });
  },
  products: function (req, res) {
    const comboc = products.filter((item) => item.category === "comboc");
    const burgers = products.filter((item) => item.category === "burgers");
    const drinks = products.filter((item) => item.category === "drinks");
    const chips = products.filter((item) => item.category === "chips");

    // fs.writeFileSync(path.join(__dirname, "../../data/cart.json"), "", "utf8");

    res.render("./products/menu", { comboc, burgers, drinks, chips });
  },
  order: function (req, res) {
    const product = products.find((item) => item.id == req.params.id);
    res.render("./products/order", { product });
  },
  selectProduct: function (req, res) {
    const comboc = products.filter((item) => item.category === "comboc");
    const burgers = products.filter((item) => item.category === "burgers");
    const drinks = products.filter((item) => item.category === "drinks");
    const chips = products.filter((item) => item.category === "chips");

    db.User.findAll().then((u) => {
      console.log(u);
    });

    res.render("./products/menuEdit", { comboc, burgers, drinks, chips });
  },
  editProduct: function (req, res) {
    const productEdit = products.find((item) => item.id == req.params.id);
    res.render("./products/editProduct", { productEdit });
  },
  create: function (req, res) {
    res.render("./products/create");
  },
  store: function (req, res) {
    console.log("req.body", req.body);
    let nuevoProducto = {
      id: products.length + 1,
      image: "./img/menu/default-img.jpg",
      colors: "",
      ...req.body,
    };
    products.push(nuevoProducto);
    storeProducts(products);
    res.redirect("/products/menu");
  },
  update: (req, res) => {
    // console.log(req.body);
    let productIndex = products.findIndex(
      (product) => product.id == req.params.productId
    );
    let infoActualizada = req.body;
    products[productIndex] = { ...products[productIndex], ...infoActualizada };
    storeProducts(products);
    // res.redirect(`/order/${req.params.productId}`);
    res.redirect("/products/edit");
  },
  delete: (req, res) => {
    let productIndex = products.findIndex(
      (product) => product.id == req.params.productId
    );
    products.splice(productIndex, 1);
    storeProducts(products);
    console.log("pase por delete");
    res.redirect("/products/menu");
  },
};

module.exports = productsController;
