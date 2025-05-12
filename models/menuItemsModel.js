const DataTypes = require("sequelize");
const sequelize=require('../config/sequelize');

const menuItem=sequelize.define(
    'menu_items',
{
    menu_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
    },
  availabe:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false,
    },
 
}
,
{
    tableName:'menu_items',
    timestamps:false,
    indexes: [
        {
            unique: true,
            fields: ['name']
        },
        {
            fields: ['category']
        },
        {
            fields: ['price']
        },
        {
            fields: ['availabe']
        }
    ]
}


)

module.exports=menuItem;