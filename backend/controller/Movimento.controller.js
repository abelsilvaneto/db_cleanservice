const Movimentacao = require('../models/Movimentacao')
const Material = require('../models/Material')

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.tipoMov || !valor.idMaterial || !valor.qtdeMov){
        return res.status(401).json({message: 'Coloque todos os valores para continuar'})
    }

    try{

        const material = await Material.findByPk(valor.idMaterial)
        
        if(!material){
            return res.status(401).json({message: 'condominio não encontrado'})
        }

        await Movimentacao.create(valor)

        res.status(201).json({message: 'Operação realizada com sucesso'})

    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

module.exports = {Cadastrar}