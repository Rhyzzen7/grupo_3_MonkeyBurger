const path = require("path");
const bcryptjs = require("bcryptjs");
const sequelize = require("sequelize");
const db = require("../../database/models");

const fs = require("fs");

const { validationResult } = require("express-validator");

const usersFilePath = path.join(__dirname, "../../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const userAPI = {
  showLogin: function (req, res) {
    res.render("./users/login");
  },
  processLogin: function (req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("./users/login", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    // const usuario = users.find(
    //   (u) =>
    //     u.email === req.body.email &&
    //     bcryptjs.compareSync(req.body.password, u.password)
    // );
    // if (!usuario) {
    //   return res.render("./users/login", {
    //     errors: { login: "Usuario y contraseña inválidos." },
    //     old: req.body,
    //   });
    // }

    // req.session.usuario = usuario;
    // if (req.body.rememberme) {
    //   res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
    // }

    // res.redirect("./");

    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((usuario) => {
      if (
        usuario &&
        bcryptjs.compareSync(req.body.password, usuario.password)
      ) {
        req.session.usuario = usuario;
        // {
        //   firstname: usuario.first_name,
        //   lastname: usuario.last_name,
        // };
        if (req.body.rememberme) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
        }
        res.redirect("./");
      } else {
        return res.render("./users/login", {
          errors: { login: "Usuario y contraseña inválidos." },
          old: req.body,
        });
      }
    });
  },
  processLogout: function (req, res) {
    res.clearCookie("userEmail");
    delete admin;
    delete user;
    req.app.locals.admin = false;
    req.app.locals.user = false;
    req.session.destroy();
    res.redirect("/");
  },
  register: function (req, res) {
    res.render("./users/register");
  },
  userProfile: function (req, res) {
    req.session.usuario.address = [];
    req.session.usuario.ordered = [];
    const usuario = req.session.usuario;
    /*Búsqueda en base de datos de las direcciones del usuario*/
    // db.Order.findAll({
    //   include: [
    //     {
    //       model: db.User,
    //       as: "usuario",
    //       where: { email: req.session.usuario.email },
    //     },
    //   ],
    // })
    //   .then((order) => {
    //     order.forEach((orderAddress) => {
    //       usuario.address.push(orderAddress.shipping_address);
    //       console.log(usuario.address);
    //     });
    //     console.log(usuario.address.length);
    //     console.log(usuario);
    //     res.render("./users/user-profile", { usuario });
    //   })
    //   .catch((err) => console.log(err));
    const order = db.Order.findAll({
      include: [
        {
          model: db.User,
          as: "usuario",
          where: { email: req.session.usuario.email },
        },
      ],
    });
    /*Pedidos*/
    const items = db.Order.findAll({
      include: [
        {
          model: db.User,
          as: "usuario",
          where: { email: usuario.email },
          required: true,
        },
        {
          model: db.Order_product,
          as: "pedido_solicitado",
          include: {
            model: db.Product,
            as: "detalle_producto_pedido",
            required: true,
          },
          required: true,
        },
      ],
    });
    /*Fin pedidos*/

    Promise.all([order, items])
      .then(([order, items]) => {
        order.forEach((orderAddress) => {
          usuario.address.push(orderAddress.shipping_address);
        });
        items.forEach((productOrdered) => {
          usuario.ordered.push(productOrdered);
        });
        console.log(usuario);
        console.log(
          "\nDirecciones encontradas para el usuario: " + usuario.email
        );
        console.log(usuario.address.length);
        console.log("\nPedidos encontrados para el usuario: " + usuario.email);
        console.log(usuario.ordered.length);
        res.render("./users/user-profile", { usuario });
      })
      .catch((err) => console.log(err));

    /*Fin de la busqueda de direcciones*/
  },
  userCreate: (req, res) => {
    res.render("/register");
  },
  procesarFormulario: function (req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("./users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    // let newUser = {
    //   ...req.body,
    //   id: users.length + 1,
    //   image: req?.file?.filename || "default.jpg",
    //   password: bcryptjs.hashSync(req.body.password, 12),
    //   role: "user",
    // };
    // delete newUser.confirm;
    // users.push(newUser);
    // fs.writeFileSync(usersFilePath, JSON.stringify(users));

    // res.redirect("/users/login");
    db.User.create({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      phone: 1234567890,
      role: "user",
      image: req?.file?.filename || "default.jpg",
      password: bcryptjs.hashSync(req.body.password, 12),
    }).then(() => {
      res.redirect("/users/login");
    });
  },
  whoAmI: function (req, res) {
    res.json("I am user API data");
  },
};

module.exports = userAPI;
