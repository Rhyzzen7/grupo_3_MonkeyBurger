const models = require("../models/data");
const fs = require("fs");
const path = require("path");

const modelsJSON = {
  write: function (product = "") {
    fs.writeFileSync(
      path.join(__dirname, "../data/products.json"),
      JSON.stringify(product),
      "utf8"
    );
  },
  read: function () {
    let product = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8")
    );
    return product;
  },
};

module.exports = modelsJSON;
