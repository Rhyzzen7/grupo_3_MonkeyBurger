module.exports = (sequelize, dataTypes) => {
  const Order_product = sequelize.define(
    "Order_product",
    {
      order_id: {
        type: dataTypes.INTEGER,
      },
      product_id: {
        type: dataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: dataTypes.INTEGER,
      },
      client_comments: {
        type: dataTypes.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  Order_product.associate = function (models) {
    Order_product.belongsToMany(models.Order, {
      as: "detalle_pedido_producto",
      foreignKey: "order_id",
    });
    Order_product.belongsToMany(models.Product, {
      as: "detalle_producto_pedido",
      foreignKey: "product_id",
    });
  };
  return Order_product;
};
