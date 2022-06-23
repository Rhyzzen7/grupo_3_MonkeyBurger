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
    // const comboc = products.filter((item) => item.category === "comboc");
    // const burgers = products.filter((item) => item.category === "burgers");
    // const drinks = products.filter((item) => item.category === "drinks");
    // const chips = products.filter((item) => item.category === "chips");
    // res.render("./products/productDetail", { comboc, burgers, drinks, chips });

    const burgers = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "burgers" },
        },
      ],
    });
    const drinks = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "drinks" },
        },
      ],
    });
    const chips = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "chips" },
        },
      ],
    });
    const comboc = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "comboc" },
        },
      ],
    });

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
    // const comboc = products.filter((item) => item.category === "comboc");
    // const burgers = products.filter((item) => item.category === "burgers");
    // const drinks = products.filter((item) => item.category === "drinks");
    // const chips = products.filter((item) => item.category === "chips");
    // fs.writeFileSync(path.join(__dirname, "../../data/cart.json"), "", "utf8");
    // res.render("./products/menu", { comboc, burgers, drinks, chips });

    // const burgers = db.Product.findAll({ where: { category_id: 1 } });
    // const drinks = db.Product.findAll({ where: { category_id: 2 } });
    // const chips = db.Product.findAll({ where: { category_id: 3 } });
    // const comboc = db.Product.findAll({ where: { category_id: 4 } });

    const burgers = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "burgers" },
        },
      ],
    });
    const drinks = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "drinks" },
        },
      ],
    });
    const chips = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "chips" },
        },
      ],
    });
    const comboc = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "comboc" },
        },
      ],
    });

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
    // const comboc = products.filter((item) => item.category === "comboc");
    // const burgers = products.filter((item) => item.category === "burgers");
    // const drinks = products.filter((item) => item.category === "drinks");
    // const chips = products.filter((item) => item.category === "chips");
    // db.User.findAll().then((u) => {
    //   console.log(u);
    // });
    // // res.render("./products/menuEdit", { comboc, burgers, drinks, chips });

    // const burgers = db.Product.findAll({ where: { category_id: 1 } });
    // const drinks = db.Product.findAll({ where: { category_id: 2 } });
    // const chips = db.Product.findAll({ where: { category_id: 3 } });
    // const comboc = db.Product.findAll({ where: { category_id: 4 } });

    const burgers = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "burgers" },
        },
      ],
    });
    const drinks = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "drinks" },
        },
      ],
    });
    const chips = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "chips" },
        },
      ],
    });
    const comboc = db.Product.findAll({
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          where: { name: "comboc" },
        },
      ],
    });

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
    // const productEdit = products.find((item) => item.id == req.params.id);
    // res.render("./products/editProduct", { productEdit });

    db.Product.findByPk(req.params.id).then((productEdit) => {
      res.render("./products/editProduct", { productEdit });
    });
  },
  create: function (req, res) {
    res.render("./products/create");
  },
  store: function (req, res) {
    //  console.log("req.body", req.body);
    // let nuevoProducto = {
    //   id: products.length + 1,
    //   image: "./img/menu/default-img.jpg",
    //   colors: "",
    //   ...req.body,
    // };
    // products.push(nuevoProducto);
    // storeProducts(products);

    db.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req?.file?.filename || "./img/menu/default-img.jpg",
      category_id: req.body.category,
    }).then(() => {
      res.redirect("/products/menu");
    });
  },
  update: (req, res) => {
    // console.log(req.body);
    // let productIndex = products.findIndex(
    //   (product) => product.id == req.params.productId
    // );
    // let infoActualizada = req.body;
    // products[productIndex] = { ...products[productIndex], ...infoActualizada };
    // storeProducts(products);
    // // res.redirect(`/order/${req.params.productId}`);

    db.Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req?.file?.filename || "./img/menu/default-img.jpg",
        category_id: req.body.category,
      },
      {
        where: { id: Number(req.params.productId) },
      }
    ).then(() => {
      res.redirect("/products/edit");
    });
  },
  delete: (req, res) => {
    // let productIndex = products.findIndex(
    //   (product) => product.id == req.params.productId
    // );
    // products.splice(productIndex, 1);
    // storeProducts(products);
    // console.log("pase por delete");

    db.Product.destroy({
      where: { id: Number(req.params.productId) },
    }).then(() => {
      res.redirect("/products/menu");
    });
  },
};

module.exports = productsController;
