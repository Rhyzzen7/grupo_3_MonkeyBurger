const Order_product = require("./models/Order_product");
const Order = require("./models/Order");
const Product_category = require("./models/Product_category");
const Product = require("./models/Product");
const User = require("./models/User");
const usersRouter = require("../../src/routes/usersRouter");

User.hasMany(Order, {as: "pedidos", foreignKey: "users_id"} );
Order.belongsTo(user, {as: "usuario"});
Product.hasOne(Product_category, {as: "categoria", foreignKey: "category_id"} );
Product_category.belongsTo(Product, {as: "producto"});
Product.hasMany(Order_product, {as: "detalle pedido", foreignKey: "order_id"});
Order_product.belongsTo(Order, {as: "detalle producto"} );