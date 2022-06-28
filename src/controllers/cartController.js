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
        {
          model: db.Order,
          as: "detalle_pedido_producto",
          where: { cart: false },
          include: {
            model: db.User,
            as: "usuario",
            where: { email: req.session.usuario.email },
            required: true,
          },
          required: true,
        },
        {
          model: db.Product,
          as: "detalle_producto_pedido",
          required: true,
        },
      ],
    })
      .then((products) => {
        console.log("Pase por cart");
        /*Logica para mostrar carrito de compras*/
        let carts = [];
        products.forEach((product) => {
          carts.push({
            id: product.id,
            name: product.detalle_producto_pedido.name,
            image: product.detalle_producto_pedido.image,
            price: product.detalle_producto_pedido.price,
            // category: "",
            quantity: product.quantity,
            "extras-1": "",
            "extras-2": "",
            "extras-3": "",
            notes: product.client_comments,
            total: product.detalle_producto_pedido.price * product.quantity,
          });
          // console.log(carts);
        });
        res.render("./products/cart", { items: carts });
      })
      .catch((err) => {
        console.log(err);
      });
    // res.render("./products/cart", { items: carts });
  },
  addCart: function (req, res) {
    // Leer archivo del carrito
    // let data = fs.readFileSync(
    //   path.join(__dirname, "../../data/cart.json"),
    //   "utf-8"
    // );
    // Cargar los datos provenientes de la vista order
    // let product = {
    //   name: "",
    //   image: "",
    //   price: "",
    //   category: "",
    //   quantity: "",
    //   extras1: "",
    //   extras2: "",
    //   extras3: "",
    //   notes: "",
    //   total: 0,
    //   ...req.body,
    // };
    // product.total = parseInt(product.price) * parseInt(product.quantity);
    // Evaluar si existe archivo de carrito
    // // if (data === "") {
    //   carts.push({ id: "1", ...product });
    // } else {
    //   carts = JSON.parse(data);
    //   carts.push({ id: carts.length + 1, ...product });
    // }
    // fs.writeFileSync(
    //   path.join(__dirname, "../../data/cart.json"),
    //   JSON.stringify(carts),
    //   "utf8"
    // );
    console.log("\n\n Prueba buscar en al agregado de Carrito \n\n");
    console.log(req.session.usuario.address);
    // let address = req.session.usuario.address;
    // address.forEach((oneAddress) => {
    //   console.log(oneAddress);
    // });

    const id_product = db.Product.findOne({ where: { name: req.body.name } });
    const id_order = db.Order.findOne({
      where: { cart: false },
      include: {
        model: db.User,
        as: "usuario",
        where: { email: req.session.usuario.email },
      },
    });

    Promise.all([id_product, id_order])
      .then(([id_product, id_order]) => {
        if (id_order == null) {
          console.log("\n\n\nCrear nuevo pedido!!!\n\n\n");
          db.Order.create({
            users_id: req.session.usuario.id,
            date: Date.now(),
            shipping_address: "",
            credit_card_number: "",
            credit_card_owner: "",
            credit_card_expiration: "",
            credit_card_security_number: "",
            cart: false,
          }).then((id_order) => {
            db.Order_product.create({
              order_id: id_order.id,
              product_id: id_product.id,
              quantity: Number(req.body.quantity),
              client_comments: `${req.body.extras1}; ${req.body.extras2}; ${req.body.extras3}; ${req.body.notes}.`,
            })
              .then(() => {
                console.log("Creación exitosa");
                res.redirect("/cart/items");
              })
              .catch((err) => console.log(err));
          });
        } else {
          db.Order_product.create({
            order_id: id_order.id,
            product_id: id_product.id,
            quantity: Number(req.body.quantity),
            client_comments: `${req.body.extras1}; ${req.body.extras2}; ${req.body.extras3}; ${req.body.notes}.`,
          })
            .then(() => {
              console.log("Creación exitosa");
              res.redirect("/cart/items");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));

    // console.log(
    //   `${product.extras1}; ${product.extras2}; ${product.extras3}; ${product.notes}.`
    // );
    // res.redirect("/cart/items");

    // db.Order_product.create({
    //   order_id: 1,
    //   product_id: product.id,
    //   quantity: product.quantity,
    //   client_comments: product.comments,
    // });
    // res.redirect("/cart/items");
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
