module.exports = (sequelize, dataTypes) => {
  const Order_product = sequelize.define(
    "Order_product",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER,
      },
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
    Order_product.belongsTo(models.Order, {
      as: "detalle_pedido_producto",
      foreignKey: "order_id",
    });
    Order_product.belongsTo(models.Product, {
      as: "detalle_producto_pedido",
      foreignKey: "product_id",
    });
  };
  return Order_product;
};
