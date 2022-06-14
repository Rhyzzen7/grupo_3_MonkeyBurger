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
  return Order_product;
};
