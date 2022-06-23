module.exports = (sequelize, dataTypes) => {
  const Product_category = sequelize.define(
    "Product_category",
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
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
    }
  );
  Product_category.associate = function (models) {
    Product_category.hasMany(models.Product, {
      as: "producto",
      foreignKey: "category_id",
    });
  };
  return Product_category;
};
