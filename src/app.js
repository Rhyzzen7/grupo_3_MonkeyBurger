const express = require("express");
const path = require("path");
const session = require("express-session");
const cookies = require("cookie-parser");
const router = require("./routes/router");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const cartRouter = require("./routes/cartRouter");
const userMiddleware = require("./middlewares/userMiddleware");
const authAdmin = require("./middlewares/authAdmin");
// const asociations = require("./database/models/asociations");

const app = express();

// Implementando session y cookieparser
app.use(
  session({
    secret: "Monkey Burger",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 5,
    },
  })
);

app.use(cookies());

app.use(userMiddleware);
app.use(authAdmin);

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
app.use(express.json());

const PORT = process.env.PORT || 4000;

//Definición de las rutas que manejarán las vistas
app.use("/", router);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));

app.use((req, res, next) => {
  //res.status(404).render("404-page");
  res.status(404).send("Página web no encontrada.");
  next();
});
