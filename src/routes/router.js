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
router.get("/order/:id", productsController.order);
router.get("/productDetail", productsController.productDetail);
router.get("/cart", cartController.cart);
router.get("/login", sessionController.login);
router.get("/register", sessionController.register);
router.get("/user", userController.userProfile);
router.get("/editProduct", productsController.editProduct);
router.get("/newProduct", productsController.newProduct);

module.exports = router;
