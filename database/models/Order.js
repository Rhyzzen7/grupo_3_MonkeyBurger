module.exports = (sequelize, dataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      users_id: {
        allowNull: false,
        type: dataTypes.INTEGER,
      },
      date: {
        allowNull: false,
        type: dataTypes.DATE, // modificacion de DATETIME por DATE
      },
      shipping_address: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      credit_card_number: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      credit_card_owner: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      credit_card_expiration: {
        allowNull: false,
        type: dataTypes.DATE,
      },
      credit_card_security_number: {
        allowNull: false,
        type: dataTypes.STRING,
      },
      cart: {
        allowNull: false,
        type: dataTypes.BOOLEAN,
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
  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      as: "usuario",
      foreignKey: "users_id",
    });
    Order.hasMany(models.Order_product, {
      as: "pedido_solicitado",
      foreignKey: "order_id",
    });
    Order.belongsToMany(models.Product, {
      as: "productos",
      through: "order_product",
      foreignKey: "orders_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };
  return Order;
};
