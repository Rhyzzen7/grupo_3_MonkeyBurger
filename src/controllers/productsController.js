const fs = require("fs");
const path = require("path");
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
    // const comboc = products.filter((item) => item.category === "comboc");
    // const burgers = products.filter((item) => item.category === "burgers");
    // const drinks = products.filter((item) => item.category === "drinks");
    // const chips = products.filter((item) => item.category === "chips");
    // res.render("./products/productDetail", { comboc, burgers, drinks, chips });

    const burgers = db.Product.findAll({ where: { category_id: 1 } });
    const drinks = db.Product.findAll({ where: { category_id: 2 } });
    const chips = db.Product.findAll({ where: { category_id: 3 } });
    const comboc = db.Product.findAll({ where: { category_id: 4 } });

    Promise.all([burgers, drinks, chips, comboc]).then(
      ([burgers, drinks, chips, comboc]) => {
        res.render("./products/productDetail", {
          burgers,
          drinks,
          chips,
          comboc,
        });
      }
    );
  },
  products: function (req, res) {
    const burgers = db.Product.findAll({ where: { category_id: 1 } });
    const drinks = db.Product.findAll({ where: { category_id: 2 } });
    const chips = db.Product.findAll({ where: { category_id: 3 } });
    const comboc = db.Product.findAll({ where: { category_id: 4 } });

    Promise.all([burgers, drinks, chips, comboc]).then(
      ([burgers, drinks, chips, comboc]) => {
        res.render("./products/menu", {
          burgers,
          drinks,
          chips,
          comboc,
        });
      }
    );
  },
  order: function (req, res) {
    // const product = products.find((item) => item.id == req.params.id);
    // res.render("./products/order", { product });

    db.Product.findByPk(req.params.id).then((product) => {
      res.render("./products/order", { product });
    });
  },
  selectProduct: function (req, res) {
    const burgers = db.Product.findAll({ where: { category_id: 1 } });
    const drinks = db.Product.findAll({ where: { category_id: 2 } });
    const chips = db.Product.findAll({ where: { category_id: 3 } });
    const comboc = db.Product.findAll({ where: { category_id: 4 } });

    Promise.all([burgers, drinks, chips, comboc]).then(
      ([burgers, drinks, chips, comboc]) => {
        res.render("./products/menuEdit", {
          burgers,
          drinks,
          chips,
          comboc,
        });
      }
    );
  },
  editProduct: function (req, res) {
    db.Product.findByPk(req.params.id).then((productEdit) => {
      res.render("./products/editProduct", { productEdit });
    });
  },
  create: function (req, res) {
    res.render("./products/create");
  },
  store: function (req, res) {
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
    res.redirect("/products/menu");
  },
};

module.exports = productsController;
