const sequelize=require('../config/sequelize');

const menuItem=sequelize.define(
    'menu_items',
{
    menu_id:{
        type:sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:sequelize.DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:sequelize.DataTypes.STRING,
        allowNull:true,
    },
    price:{
        type:sequelize.DataTypes.FLOAT,
        allowNull:false,
    },
    category:{
        type:sequelize.DataTypes.STRING,
        allowNull:false,
    },
  availabe:{
        type:sequelize.DataTypes.BOOLEAN,
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