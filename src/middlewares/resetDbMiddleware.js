const fs = require("fs");
const path = require("path");
const db = require("../../database/models");
//lectura de datos
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/users.json"), "utf-8")
);

const contacts = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/contacts.json"), "utf-8")
);

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/products.json"), "utf-8")
);

const cart = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/cart.json"), "utf-8")
);
// Declaracion del middleware
function resetDbMiddleware(req, res, next) {
  users.forEach((user) => {
    db.User.create({
      first_name: user.firstname,
      last_name: user.lastname,
      email: user.email,
      phone: 1234567890,
      role: user.role,
      image: user.image,
      password: user.password,
    }).then(() => {
      console.log("Done it users!");
    });
  });
  db.Product_category.create({
    name: "burgers",
  }).then(() => {
    console.log("Done it category!");
    products.forEach((product) => {
      db.Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        colors: product.colors,
        category_id: 1,
      }).then(() => {
        console.log("Done it products!");
      });
    });
  });

  //   console.log(contacts);
  //   console.log(products);
  //   console.log(cart);

  next();
}

module.exports = resetDbMiddleware;
