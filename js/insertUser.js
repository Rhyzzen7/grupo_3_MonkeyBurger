const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const user = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8")
);

//console.log(user);

console.log(db.User.length);
