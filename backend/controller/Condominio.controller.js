const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'
const Condominio = require('../models/Condominio')
const { where } = require('sequelize')

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.nomeCondo || !valor.cnpj || !valor.local){
        return res.status(401).json({message: 'Coloque todos os valores para continuar'})
    }

    try{
        const cnpjCrypto = cryptoJS.AES.encrypt(valor.cnpj,CHAVE_SEGREDO).toString()

        await Condominio.create({
            nomeCondo: valor.nomeCondo,
            cnpj: cnpjCrypto,
            local: valor.local
        })

        res.status(201).json({message: 'Operação realizada com sucesso'})

    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

const ConsultarCod = async (req,res)=>{
    const id = req.params.id

    try{

        const condominio = await Condominio.findByPk(id)

        if(!condominio){
            return res.status(401).json({message: 'condominio não encontrado'})
        }

        const bytes = cryptoJS.AES.encrypt(condominio.cnpj,CHAVE_SEGREDO)
        const cnpjDescrypto = bytes.toString(cryptoJS.enc.Utf8)

        res.status(201).json({
            codCondominio: condominio.codCondominio,
            nomeCondo: condominio.nomeCondo,
            cnpj: cnpjDescrypto,
            local: condominio.local
        })

    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

const ConsultarNome = async (req,res)=>{
    const nome = req.params.nome

    try{

        const condominio = await Condominio.findOne({where: {nome: nome}})

        if(!condominio){
            return res.status(401).json({message: 'condominio não encontrado'})
        }

        const bytes = cryptoJS.AES.encrypt(condominio.cnpj,CHAVE_SEGREDO)
        const cnpjDescrypto = bytes.toString(cryptoJS.enc.Utf8)

        res.status(201).json({
            codCondominio: condominio.codCondominio,
            nomeCondo: condominio.nomeCondo,
            cnpj: cnpjDescrypto,
            local: condominio.local
        })

    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

const Atualizar = async (req,res)=>{
    const valor = req.body
    const id = req.params.id

    if(!valor.nomeCondo || !valor.cnpj || !valor.local){
        return res.status(401).json({message: 'Coloque todos os valores para continuar'})
    }

    try{

        const condominio = await Condominio.findOne({where: {nome: nome}})

        if(!condominio){
            return res.status(401).json({message: 'condominio não encontrado'})
        }

        const dados2 = {...valor}

        if(valor.cnpj){
            dados2.cnpj = cryptoJS.AES.encrypt(valor.cnpj,CHAVE_SEGREDO).toString()
        }

        await Condominio.update(dados2,{where:{ codCondominio: id}})

        res.status(201).json({message: 'Operação realizada com sucesso'})

    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

const Apagar = async (req,res)=>{
    const id = req.params.id

    try{

        const condominio = await Condominio.findByPk(id)

        if(!condominio){
            return res.status(401).json({message: 'condominio não encontrado'})
        }

        await Condominio.destroy({where: {codCondominio: id}})

        res.status(201).json({message: 'Operação realizada com sucesso'})
    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}
module.exports = {Cadastrar, ConsultarCod, ConsultarNome, Atualizar, Apagar}