module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      // Por qué name sería PK?
      name: {
        primaryKey: true,
        type: dataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: dataTypes.TEXT,
      },
      // Por qué price sería PK?
      price: {
        primaryKey: true,
        type: dataTypes.DECIMAL,
        // allowNull: false,
      },
      image: {
        type: dataTypes.TEXT,
      },
      // eliminar columna colors
      // colors: {
      //   type: dataTypes.TEXT,
      // },
      category_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  /* Introducción de asociociaciones hasta que Lourdes indique como requerir el archivo asociations.js en cada models y seguidamente en cada controlador solo se requiera el model*/
  Product.associate = function (models) {
    Product.hasOne(models.Product_category, {
      as: "categoria",
      foreignKey: "category_id",
    });
    Product.belongsToMany(models.Order, {
      // models.Actor -> Actors es el valor de alias en actor.js
      as: "detalle_pedido",
      through: "order_product",
      foreignKey: "order_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };
  return Product;
};
