const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Material = db.define('material',{
    codMaterial:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    categoria:{
        type: DataTypes.ENUM('DESINFETANTE','DETERGENTE', 'EPI'),
        allowNull: false
    },    
    estoqueQtde:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codLote:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idCondo:{
        type: DataTypes.INTEGER,
        references:{
            model: 'condominios',
            key: 'codCondominio'
        },
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'materiais'
})

module.exports = Material