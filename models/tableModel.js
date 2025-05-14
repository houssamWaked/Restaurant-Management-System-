const DataType=require('sequelize');
const sequelize=require('../config/sequelize');



const Table=sequelize.define(
    'tables',
{
    table_id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    
    },
number:{
        type:DataType.INTEGER,
        allowNull:false,
        unique:true,
        
    },
    seats:{
        type:DataType.INTEGER,
        allowNull:false,
        
    },
    status:{
        type:DataType.ENUM('available','reserved'),
        defaultValue:'available',
        allowNull:false,
        

}

},
{
    tableName:'tables',
    timestamps:false,
    indexes: [
        {
            unique: true,
            fields: ['number']
        },
        {
            fields: ['status']
        },
        {
            fields: ['seats']
        }
    ]
}
);
module.exports=Table;