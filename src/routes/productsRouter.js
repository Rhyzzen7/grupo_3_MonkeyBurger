const express = require("express");
const { products } = require("../controllers/productsController");
const productsRouter = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const userOrderMiddleware = require("../middlewares/userOrderMiddleware");

const productsController = require("../controllers/productsController");

// All Products
productsRouter.get("/menu", productsController.products);

// Product Detail
productsRouter.get("/order/:id", userOrderMiddleware, productsController.order);
//productsRouter.post("order/:id", productsController.orderChoice);

/* El método post no está funcionando, ya fue arreglado en la vista menu los formularios
Debe modificarse todos los inputs
Debe respetarse lo declarado en el JSON
Debe cargarse con los valores provisto por la variable burgers

Mejor decisión, pasarlo por GET*/

// Create a new Product
productsRouter.get("/create", adminMiddleware, productsController.create);
productsRouter.post("/create", adminMiddleware, productsController.store);

// Edit a product
// productsRouter.get("/edit", productsController.selectProduct);
// productsRouter.get("/edit/:id", productsController.editProduct);
// productsRouter.put("/order/:productId", productsController.update);
productsRouter.get("/edit", adminMiddleware, productsController.selectProduct);
productsRouter.get(
  "/edit/:id",
  adminMiddleware,
  productsController.editProduct
);
productsRouter.put(
  "/order/:productId",
  adminMiddleware,
  productsController.update
);
// Delete a product
// productsRouter.delete("/order/:productId", productsController.delete);
productsRouter.delete(
  "/order/:productId",
  adminMiddleware,
  productsController.delete
);
module.exports = productsRouter;
