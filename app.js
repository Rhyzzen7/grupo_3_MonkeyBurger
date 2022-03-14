let express = require("express");
let app = express();
let path = require("path");

app.use(express.static(path.join(path.resolve(__dirname), "./public")));

app.listen(4000, () => console.log("Servidor corriendo en puerto 4000"));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/index.html"));
});

app.get("/productDetail.html", (req, res) => {
  res.sendFile(
    path.join(path.resolve(__dirname), "./views/productDetail.html")
  );
});

app.get("/menu.html", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/menu.html"));
});
app.get("/nosotros.html", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/nosotros.html"));
});
app.get("/haceTuPedido.html", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/haceTuPedido.html"));
});
app.get("/productCar.html", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/productCar.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/register.html"));
});
