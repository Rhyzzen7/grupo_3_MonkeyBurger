const express = require("express");
const cartRouter = express.Router();

const cartController = require("../controllers/cartController");

cartRouter.get("/cart", cartController.cart);
cartRouter.put("/cart", cartController.cart);

module.exports = cartRouter;
