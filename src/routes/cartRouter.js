const express = require("express");
const cartRouter = express.Router();

const cartController = require("../controllers/cartController");

//cartRouter.get("/items", cartController.cart);
cartRouter.put("/items", cartController.addCart);

module.exports = cartRouter;
