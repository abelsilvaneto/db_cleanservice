const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Movimentacao = db.define('movimentacao',{
    codMov:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoMov:{
        type: DataTypes.ENUM('SAIDA','ENTRADA'),
        allowNull: false
    },    
    qtdeMov:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMaterial:{
        type: DataTypes.INTEGER,
        references:{
            model: 'materiais',
            key: 'codMaterial'
        },
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'movimentacoes'
})

module.exports = Movimentacao