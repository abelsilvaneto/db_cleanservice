const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')

const AuthMiddleware = require('./middleware/auth.middleware')

require('./models/rel')

const controllerMov = require('./controller/Movimento.controller')
const controllerCondominio = require('./controller/Condominio.controller')
const controllerFuncionario = require('./controller/Funcionario.controller')
const controllerMaterial = require('./controller/Material.controller')
const controllerAuth = require('./controller/Auth.controller')

const HOST = 'localhost'
const PORT = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', controllerFuncionario.Cadastrar)
app.post('/login', controllerAuth.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'aplicação rodando'})
})

app.use(AuthMiddleware)

app.post('/condominio', controllerCondominio.Cadastrar)
app.get('/condominio/:id', controllerCondominio.ConsultarCod)
app.get('/condominio/busca/:nome', controllerCondominio.ConsultarNome)
app.put('/condominio/:id', controllerCondominio.Atualizar)
app.delete('/condominio/:id', controllerCondominio.Apagar)

app.post('/material', controllerMaterial.Cadastrar)

app.post('/movimentacao', controllerMov.Cadastrar)


conn.sync()
.then(()=>{
        app.listen(PORT, HOST, ()=>{
            console.log(`Servidor rodando em http://${HOST}:${PORT}`)
        })
})
.catch((err)=>{
    console.error('Erro na conexão com o banco', err)
})

