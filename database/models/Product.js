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
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: dataTypes.TEXT,
      },
      price: {
        type: dataTypes.DECIMAL,
        allowNull: false,
      },
      image: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
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

  Product.associate = function (models) {
    Product.belongsTo(models.Product_category, {
      as: "categoria",
      foreignKey: "category_id",
    });
    Product.belongsToMany(models.Order_product, {
      as: "detalle_pedido",
      through: "order_product",
      foreignKey: "product_id",
      otherKey: "order_id",
      timestamps: false,
    });
  };

  return Product;
};
