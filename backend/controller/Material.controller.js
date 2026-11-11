const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'
const Material = require('../models/Material')
const Condominio = require('../models/Condominio')

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.descricao || !valor.categoria || !valor.estoqueQtde || !valor.codLote || !valor.idCondo){
        return res.status(401).json({message: 'Coloque todos os valores para continuar'})
    }

    try{

        const condominio = await Condominio.findByPk(valor.idCondo)
        
        if(!condominio){
            return res.status(401).json({message: 'condominio não encontrado'})
        }

        const codLoteCrypto = cryptoJS.AES.encrypt(valor.codLote,CHAVE_SEGREDO).toString()

        await Material.create({
            descricao: valor.descricao,
            categoria: valor.categoria,
            estoqueQtde: valor.estoqueQtde,
            codLote: codLoteCrypto,
            idCondo: valor.idCondo
        })

        res.status(201).json({message: 'Operação realizada com sucesso'})

    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

module.exports = {Cadastrar}