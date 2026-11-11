const cryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

function AuthMIddleware(req,res,next) {
    const token = req.headers['authorization']
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'token não gerado'})
    }

    try{
        const bytes = cryptoJS.AES.decrypt(token,CHAVE_SEGREDO)
        const dadosCrypto = bytes.toString(cryptoJS.enc.Utf8)

        if(!dadosCrypto){
            return res.status(401).json({message: 'Token invalido'})
        }

        const payload = JSON.parse(dadosCrypto)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'Sessão expirada'})
        }

        next()
    }catch(err){
      return res.status(500).json({message: 'Erro na operação'})
    }
}

module.exports = AuthMIddleware