const express = require("express");
const productsRouter = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const userOrderMiddleware = require("../middlewares/userOrderMiddleware");
const multer = require("multer");
const path = require("path");

const productsController = require("../controllers/productsController");
const validateProduct = require("../validations/productValidator");

const productAPI = require("../API/productAPI");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/menu"));
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    req.body.hasFile = true;
    let filetypes = /jpg|jpeg|png|gif/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    // cb(new Error("Invalid IMAGE Type"));
    cb((null, false));
  },
});

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
productsRouter.post(
  "/create",
  adminMiddleware,
  upload.single("image"),
  validateProduct,
  productsController.store
);

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
  upload.single("productimage"),
  validateProduct,
  productsController.update
);
// Delete a product
// productsRouter.delete("/order/:productId", productsController.delete);
productsRouter.delete(
  "/order/:productId",
  adminMiddleware,
  productsController.delete
);

productsRouter.get("/api", productAPI.whoAmI);

module.exports = productsRouter;
