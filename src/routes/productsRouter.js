const express = require("express");
const { products } = require("../controllers/productsController");
const productsRouter = express.Router();

const productsController = require("../controllers/productsController");

// All Products
productsRouter.get("/menu", productsController.products);

// Product Detail
productsRouter.get("/order/:id", productsController.order);
//productsRouter.post("order/:id", productsController.orderChoice);

/* El método post no está funcionando, ya fue arreglado en la vista menu los formularios
Debe modificarse todos los inputs
Debe respetarse lo declarado en el JSON
Debe cargarse con los valores provisto por la variable burgers

Mejor decisión, pasarlo por GET*/

// Create a new Product
productsRouter.get("/create", productsController.create);
//productsRouter.post("/create", productsController.store);

// Edit a product
productsRouter.get("/edit/:id", productsController.editProduct);
productsRouter.put("/order/:productId", productsController.update);

// Delete a product
productsRouter.delete("/order/:productId", productsController.delete);

module.exports = productsRouter;
