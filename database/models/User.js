module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      //agregado de UNIQUE KEY
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
        //uniqueKey: true,
      },
      phone: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      password: {
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
  /* Introducción de asociociaciones hasta que Lourdes indique como requerir el archivo asociations.js en cada models y seguidamente en cada controlador solo se requiera el model*/
  User.asociate = function (models) {
    User.hasMany(models.Order, {
      as: "pedidos",
      foreignKey: "user_id",
    });
  };
  return User;
};
