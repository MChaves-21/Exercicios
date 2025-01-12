// Importa o framework Express, que facilita a criação de servidores
const express = require('express')
// Importa o módulo 'path' para lidar com caminhos de arquivos e diretórios
const path = require('node:path')
// Importa o roteador para definir as rotas do servidor
const router = require('./router')
// Cria uma instância do aplicativo Express
const app = express()
// Define o motor de visualização como EJS (para renderizar templates HTML)
app.set('view engine', 'ejs')
// Define o diretório onde os arquivos de visualização (views) serão armazenados
app.set('views', path.join(__dirname, 'views'))
// Middleware para fazer o parse dos dados do corpo da requisição (formulários)
app.use(express.urlencoded({ extended: true }))
// Usa o roteador para definir as rotas da aplicação
app.use(router)
// Define a porta onde o servidor irá escutar as requisições
const PORT = process.env.PORT || 3000
// Inicia o servidor na porta definida e exibe uma mensagem no console quando estiver rodando
app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`)
})
