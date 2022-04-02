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
  res.sendFile(path.join(__dirname, "./views/productDetail.html"));
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/menu.html"));
});
app.get("/nosotros", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/nosotros.html"));
});
app.get("/haceTuPedido", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/haceTuPedido.html"));
});
app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/productCart.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});
app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/contacto.html"));
});

app.get("/usuario", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/perfil-usuario.html"));
});
