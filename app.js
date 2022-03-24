let express = require("express");
let app = express();
let path = require("path");

app.use(express.static(path.join(path.resolve(__dirname), "./public")));

app.listen(4000, () => console.log("Servidor corriendo en puerto 4000"));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/index.html"));
});

app.get("/productDetail", (req, res) => {
  res.sendFile(
    path.join(path.resolve(__dirname), "./views/productDetail.html")
  );
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/menu.html"));
});
app.get("/nosotros", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/nosotros.html"));
});
app.get("/haceTuPedido", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/haceTuPedido.html"));
});
app.get("/productCart", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/productCart.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/register.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/login.html"));
});
app.get("/contacto", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/contacto.html"));
});

app.get("/usuario", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/perfil-usuario.html"));
});
