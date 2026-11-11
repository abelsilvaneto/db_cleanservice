const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'
const Funcionario = require('../models/Funcionario')

const login = async (req,res)=>{
    const valor = req.body

    if(!valor.email || !valor.senha){
        return res.status(401).json({message: 'Coloque todos os valores para continuar'})
    }

    try{
    
        const funcionario = await Funcionario.findOne({where: {email: valor.email}})
        if(!funcionario){
            return res.status(401).json({message: 'Funcionario não encontrado'})
        }

        const bytes = cryptoJS.AES.decrypt(valor.senha,CHAVE_SEGREDO)
        const senhaDescrypto = bytes.toString(cryptoJS.enc.Utf8)

        if(senhaDescrypto ==! valor.senha){
            return res.status(401).json({message:'Senha ou email incorreto'})
        }

        const TempoMs = 240 * 60 * 1000
        const TempoExpira = Date.now() + TempoMs

        const payload={
            idFuncionario: funcionario.codFuncionario,
            email: funcionario.email,
            expiraEm: TempoExpira 
        }

        const token = cryptoJS.AES.encrypt(JSON.stringify(payload),CHAVE_SEGREDO).toString()
        res.status(201).json({
            message: 'Login realizado',
            email: valor.email,
            token: token
        })

    }catch(err){
     res.status(500).json({message: 'Erro na operação'})
    console.error('Erro na operação',err)
    }
}

module.exports = {login}