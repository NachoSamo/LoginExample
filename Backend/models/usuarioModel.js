const { DataTypes } = require('sequelize')
const sequelize = require ('../data/database')

const User = sequelize.define( 'User', {
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    }
    
}, {
    tableName: 'User',
    timestamps:false
}
);

module.exports = User;