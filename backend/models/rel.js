const Condominio = require('./Condominio')
const Movimentacao = require('./Movimentacao')
const Material = require('./Material')
const Funcionario = require('./Funcionario')

Condominio.hasMany(Material,{
    foreignKey: 'idCondo',
    as: 'MaterialCondominio',
    onDelete: 'CASCADE'
})

Material.belongsTo(Condominio,{
    foreignKey: 'idCondo',
    as: 'CondominioMaterial',
    allowNull: false
})

Material.hasOne(Movimentacao,{
    foreignKey: 'idMaterial',
    as: 'MovimentacaoMaterial',
    onDelete: 'CASCADE'
})

Movimentacao.belongsTo(Material,{
    foreignKey: 'idMaterial',
    as: 'MaterialMovimentacao',
    allowNull: false
})

module.exports = {Condominio,Movimentacao,Material,Funcionario}