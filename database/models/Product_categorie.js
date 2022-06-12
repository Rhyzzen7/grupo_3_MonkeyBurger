module.exports = (sequelize, dataTypes) => {
    const Product_categorie = sequelize.define("Product_categorie", {
    id: {
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: dataTypes.STRING,
        allowNull: false
    }
    });
    return Product_categorie;}