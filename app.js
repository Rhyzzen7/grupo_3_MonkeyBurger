let express = require("express");
let app = express();
let path = require("path");

app.use(express.static(path.join(path.resolve(__dirname), "./public")));

app.listen(4000, () => console.log("funciona"));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname), "./views/index.html"));
});
