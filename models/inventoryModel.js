
const DataTypes = require("sequelize");
const sequelize=require('../config/sequelize');



const Inventory=sequelize.define(
'inventory',
{
    inventory_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    item_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    unit:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    last_updated:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
        allowNull:false,
    },
}
,
{
    tableName:'inventory',
    timestamps:false,
    indexes: [
        {
            unique: true,
            fields: ['item_name']
        },
        {
            fields: ['quantity']
        },
        {
            fields: ['unit']
        },
        {
            fields: ['last_updated']
        }
    ]
}


)
module.exports=Inventory;