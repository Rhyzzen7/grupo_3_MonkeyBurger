const express = require("express");
const cartRouter = express.Router();
const userOrderMiddleware = require("../middlewares/userOrderMiddleware");

const cartController = require("../controllers/cartController");

cartRouter.get("/items", userOrderMiddleware, cartController.cart);

cartRouter.put("/items", userOrderMiddleware, cartController.addCart);

// cartRouter.get("/menu", cartController.menu);

cartRouter.get("/purchase", userOrderMiddleware, cartController.purchase);

module.exports = cartRouter;
