const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/productDetail", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/products/productDetail.html"));
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/products/menu.html"));
});
app.get("/nosotros", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/users/nosotros.html"));
});
app.get("/haceTuPedido", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/products/haceTuPedido.html"));
});
app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/products/productCart.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/users/register.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/users/login.html"));
});
app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/users/contacto.html"));
});

app.get("/usuario", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/users/perfil-usuario.html"));
});
