const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/router");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set ("views", path.join(__dirname, "./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 

const PORT = process.env.PORT || 4000;

app.use("/", router);

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));