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
        primaryKey: true,
        type: dataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: dataTypes.TEXT,
      },
      price: {
        primaryKey: true,
        type: dataTypes.DECIMAL,
        // allowNull: false,
      },
      image: {
        type: dataTypes.TEXT,
      },
      colors: {
        type: dataTypes.TEXT,
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
  return Product;
};
