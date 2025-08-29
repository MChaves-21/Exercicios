// src/controllers/auth-controller.js

const { JWT_SECRET } = require('../config/environment')  // Importa a chave secreta para o JWT (JSON Web Token) do arquivo de configuração.
const users = require('../models/users')  // Importa o modelo de usuários que contém funções para manipular os dados dos usuários.
const jwt = require('jsonwebtoken')  // Importa a biblioteca jsonwebtoken para criar e verificar tokens JWT.

module.exports = {
  // POST /auth/register - Rota para registrar um novo usuário
  register: (req, res) => {
    // Desestruturação do corpo da requisição para pegar os dados necessários: nome, e-mail e senha
    const { name, email, password } = req.body

    // Verifica se os dados enviados são válidos (se são strings)
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid fields!' })  // Se algum dos dados não for string, retorna erro 400 com a mensagem "Invalid fields!"
    }

    // Chama a função registerUser do modelo de usuários para registrar o novo usuário
    const registeredUser = users.registerUser(name, email, password)

    // Se o e-mail já estiver em uso, retorna erro 400
    if (!registeredUser) {
      return res.status(400).json({ message: 'Email already in use!' })
    }

    // Se o usuário for registrado com sucesso, retorna o usuário criado com o status 201 (Created)
    res.status(201).json(registeredUser)
  },

  // POST /auth/login - Rota para fazer o login do usuário
  login: (req, res) => {
    // Desestruturação para pegar e-mail e senha do corpo da requisição
    const { email, password } = req.body

    // Verifica se os campos de e-mail e senha são strings válidas
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid fields!' })  // Se os campos não forem válidos, retorna erro 400
    }

    // Busca o usuário no banco de dados (ou no array, no caso do modelo atual) com base no e-mail
    const user = users.findByEmail(email)

    // Se o usuário não for encontrado, retorna erro 404
    if (!user) return res.status(404).json({ message: 'User not found!' })

    // Verifica se a senha fornecida no login é igual à senha armazenada para o usuário
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' })  // Se as senhas não coincidirem, retorna erro 400
    }

    // Se o login for bem-sucedido, cria um payload com as informações essenciais do usuário
    const payload = { id: user.id, email: user.email }

    // Gera um token JWT, que será usado para autenticar o usuário nas próximas requisições
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })  // O token expira em 1 dia

    // Retorna o token gerado no corpo da resposta, que o cliente irá usar para autenticar futuras requisições
    res.json({ token })
  }
}
