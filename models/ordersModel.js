const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');
const Orders = sequelize.define(
    'orders',
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        table_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tables',
                key: 'table_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        status: {
            type: DataTypes.ENUM('pending','preparing','served','cancelled'),
            defaultValue: 'pending',
            allowNull: false,
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        tableName: 'orders',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['order_id'],
            },
            {
                fields: ['user_id'],
            },
            {
                fields: ['table_number'],
            },
        ],
    }

);

module.exports = Orders;