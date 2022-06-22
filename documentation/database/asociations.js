const Order_product = require("./models/Order_product");
const Order = require("./models/Order");
const Product_category = require("./models/Product_category");
const Product = require("./models/Product");
const User = require("./models/User");
const usersRouter = require("../../src/routes/usersRouter");

User.hasMany(Order, {
  as: "pedidos",
  foreignKey: "user_id",
}); //En User
Order.belongsTo(User, {
  as: "usuario",
  foreignKey: "user_id",
}); //En Order y faltaba foreignKey: "user_id"
Product.hasOne(Product_category, {
  as: "categoria",
  foreignKey: "category_id",
}); //En Product
Product_category.belongsTo(Product, {
  as: "producto",
  foreignKey: "category_id",
}); //En Product_category y falta foreignKey: "category_id"
Product.hasMany(Order_product, {
  as: "detalle pedido",
  foreignKey: "order_id",
}); //En Product
Order_product.belongsTo(Order, {
  as: "detalle producto",
}); //En Order_product pero falta entender
