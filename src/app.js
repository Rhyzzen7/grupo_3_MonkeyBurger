const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/router");
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

app.use("/", router);

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));
