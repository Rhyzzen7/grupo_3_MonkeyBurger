const test = require("./modelsJSON");
const model = require("../models/data");
test.write(model);

let product = test.read();
console.log(product);
