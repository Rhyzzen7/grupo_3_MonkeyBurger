const fs = require("fs");
const { join } = require("path");
const path = require("path");
const sequelize = require("sequelize");
const db = require("../../database/models");

const { validationResult } = require("express-validator");

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
    // const burgers = db.Product.findAll({ where: { category_id: 1 } });
    // const drinks = db.Product.findAll({ where: { category_id: 2 } });
    // const chips = db.Product.findAll({ where: { category_id: 3 } });
    // const comboc = db.Product.findAll({ where: { category_id: 4 } });
    // console.log();

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
    // console.log("hola");
    db.Product.findByPk(req.params.id).then((product) => {
      res.render("./products/order", { product });
    });
  },
  selectProduct: function (req, res) {
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
    db.Product.findByPk(req.params.id).then((productEdit) => {
      res.render("./products/editProduct", { productEdit });
    });
  },
  create: function (req, res) {
    res.render("./products/create");
  },
  store: function (req, res) {
    // let nuevoProducto = {
    //   id: products.length + 1,
    //   image: "./img/menu/default-img.jpg",
    //   colors: "",
    //   ...req.body,
    // };
    // products.push(nuevoProducto);
    // storeProducts(products);
    // res.redirect("/products/menu");
    // console.log(req.file);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("./products/create", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    db.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: "./img/menu/" + (req?.file?.filename || "default-img.png"),
      category_id: req.body.category,
    }).then(() => {
      res.redirect("/products/menu");
    });
  },
  update: (req, res) => {
    // let productIndex = products.findIndex(
    //   (product) => product.id == req.params.productId
    // );
    // let infoActualizada = req.body;
    // products[productIndex] = { ...products[productIndex], ...infoActualizada };
    // storeProducts(products);
    // // res.redirect(`/order/${req.params.productId}`);
    // res.redirect("/products/edit");
    const idEdit = Number(req.params.productId);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return db.Product.findByPk(idEdit).then((productEdit) => {
        res.render("./products/editProduct", {
          productEdit,
          errors: errors.mapped(),
          old: req.body,
        });
      });
    }

    db.Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: "./img/menu/" + (req?.file?.filename || "default-img.png"),
        category_id: req.body.category,
      },
      {
        where: { id: idEdit },
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
    // res.redirect("/products/menu");
    db.Product.destroy({
      where: { id: Number(req.params.productId) },
    }).then(() => {
      res.redirect("/products/menu");
    });
  },
  api_list_products: async (req, res) => {
    const { page } = req.query;

    const productsQueryConfig = page
      ? {
          offset: 10 * page,
          limit: 10,
          subQuery: false,
        }
      : {};
    const products = await db.Product.findAll({
      ...productsQueryConfig,
      raw: true,
    });
    let productsWithDetails = products.map((product) => ({
      ...product,
      detail: `${req.protocol}://${req.get("host")}/products/order/${
        product.id
      }`,
    }));
    const categories = await db.Product.findAll({
      attributes: [
        [sequelize.col("categoria.name"), "category_name"],
        [
          sequelize.fn("COUNT", sequelize.col("categoria.id")),
          "total_products",
        ],
      ],
      include: [
        {
          model: db.Product_category,
          as: "categoria",
          attributes: [],
        },
      ],
      group: "category_name",
    });

    return res.status(200).json({
      count: productsWithDetails.length,
      countByCategory: categories,
      products: productsWithDetails,
    });
  },
  api_product_details: async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, { raw: true });
    const imagen = product.image;
    const productDetail = {
      ...product,
      url_imagen: `${req.protocol}://${req.get("host")}/${imagen}`,
    };
    return res.status(200).json({
      data: productDetail,
    });
  },
};

module.exports = productsController;
