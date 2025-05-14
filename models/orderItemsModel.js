
const DataTypes = require("sequelize");
const sequelize = require('../config/sequelize');


const OrderItems = sequelize.define(
    'order_items',
    {
        order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        menu_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        },
    },
    {
        tableName: 'order_items',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['order_item_id']
            },
            {
                fields: ['order_id']
            },
            {
                fields: ['menu_item_id']
            },
            {
                fields: ['quantity']
            },
            {
                fields: ['price']
            }
        ]
    }
    );

module.exports = OrderItems;