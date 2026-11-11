const {Condominio,Movimentacao,Material,Funcionario} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
    await conn.sync({force:true})
    console.log('Realizando conexão com o banco')
    }catch(err){
    console.error('Erro na operação', err)
    }finally{
    console.log('Fechando conexão com o banco')
    await conn.close()
    }
}

syncDataBase()