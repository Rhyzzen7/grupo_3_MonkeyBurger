module.exports = (sequelize, dataTypes) => {
    const Order = sequelize.define("Order", {
    id: {
            primaryKey: true,
            allowNull: false,
            type: dataTypes.INTEGER
        }, 
    user_id: {
        allowNull: false,
        type: dataTypes.INTEGER
    },
    date: {
        allowNull: false,
        type: dataTypes.DATETIME
    },
    shipping_address: {
        allowNull: false,
        type: dataTypes.STRING 
    },
    credit_card_number: {
        allowNull: false,
        type: dataTypes.STRING
    },
    credit_card_owner: {
        allowNull: false,
        type: dataTypes.STRING
    },
    credit_card_expiration: {
        allowNull: false,
        type: dataTypes.DATE
    },
    credit_card_security_number: {
        allowNull: false,
        type: dataTypes.STRING
    }
    });
    return Order;}