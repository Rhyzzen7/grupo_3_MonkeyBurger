const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/router");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const cartRouter = require("./routes/cartRouter");

// Pasar poder usar los métodos PUT, PATCH y DELETE
const methodOverride = require("method-override");

//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
// Pasar poder pisar el method="POST" en el formulario por PUT, PATCH y DELETE
app.use(methodOverride("_method"));

//Configuración del template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

const PORT = process.env.PORT || 4000;

//Definición de las rutas que manejarán las vistas
app.use("/", router);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));
