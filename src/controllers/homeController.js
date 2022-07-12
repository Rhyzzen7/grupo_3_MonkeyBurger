const path = require("path");
const products = require("../../models/data");
const sequelize = require("sequelize");
const db = require("../../database/models");

const homeController = {
  home: function (req, res) {
    // const news = products.filter((item) => item.category === "news");
    // const proms = products.filter((item) => item.category === "proms");
    // res.render("./main/index", { news, proms });

    const news = db.Product.findAll({ where: { category_id: 5 } });
    const proms = db.Product.findAll({ where: { category_id: 6 } });
    Promise.all([news, proms]).then(([news, proms]) => {
      // console.log(proms1.length);
      // console.log(news1.length);
      /* ----------------- */
      // Establecimiento de variables globales //
      req.app.locals.admin = false;
      req.app.locals.user = false;
      /* ----------------- */
      res.render("./main/index", { news, proms });
    });
  },
};

module.exports = homeController;
