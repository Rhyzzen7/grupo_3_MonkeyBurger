const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const contactController = require("../controllers/contactController");
const aboutController = require("../controllers/aboutController");
const productsController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");
const sessionController = require("../controllers/sessionController");
const userController = require("../controllers/userController");

router.get("/", homeController.home);
router.get("/about", aboutController.about);
router.get("/contact", contactController.contact);
router.get("/menu", productsController.menu);
router.get("/order", productsController.order);
router.get("/product", productsController.productDetail);
router.get("/cart", cartController.cart);
router.get("/login", sessionController.login);
router.get("/register", sessionController.register);
router.get("/user", userController.userProfile);

module.exports = router;
