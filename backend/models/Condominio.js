const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Condominio = db.define('condominio',{
    codCondominio:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeCondo:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    local:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cnpj:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'condominios'
})

module.exports = Condominio