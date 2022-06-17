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
  return User;
};
