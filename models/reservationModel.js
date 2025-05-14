const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const reservation = sequelize.define(
    'reservation',
    {
        reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
     contact_info: {
        type: DataTypes.STRING,
        allowNull: false,
        },
     tableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tables',
            key: 'table_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        },
        reservation_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        },
        number_of_guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        status: {
        type: DataTypes.ENUM('booked','available','completed'),
        defaultValue: 'available',
        allowNull: false,
        },
     
        
    },
    {
        tableName: 'reservation',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['customer_name']
            },
            {
                fields: ['contact_info']
            },
            {
                fields: ['tableNumber']
            },
            {
                fields: ['reservation_time']
            },
            {
                fields: ['number_of_guests']
            },
            {
                fields: ['status']
            }
        ]
    }
    );
// Export the reservation model for use in other parts of the application
module.exports = reservation;