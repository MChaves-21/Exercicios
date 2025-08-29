const express = require('express')  // Importa o framework Express para criar as rotas
const authController = require('./controllers/auth-controller')  // Importa o controlador de autenticação
const usersController = require('./controllers/users-controller')  // Importa o controlador de usuários
const welcomeController = require('./controllers/welcome-controller')  // Importa o controlador de boas-vindas
const { optionalAuth, ensureAuth, ensureAdmin } = require('./middlewares/auth-middleware')  // Importa os middlewares de autenticação

const router = express.Router()  // Cria um roteador Express para gerenciar as rotas

// Rota de registro de um novo usuário (POST /auth/register)
router.post('/auth/register', authController.register)
// Rota de login de um usuário existente (POST /auth/login)
router.post('/auth/login', authController.login)

// Rota de boas-vindas (GET /welcome)
// A rota é acessível por qualquer usuário (autenticado ou não), graças ao middleware 'optionalAuth'
router.get('/welcome', optionalAuth, welcomeController.index)

// Rotas de gerenciamento de usuários (somente para administradores)
// Todas essas rotas exigem que o usuário esteja autenticado e tenha a permissão de administrador
router.get('/users', ensureAuth, ensureAdmin, usersController.index)  // Lista todos os usuários
router.get('/users/:id', ensureAuth, ensureAdmin, usersController.show)  // Mostra um usuário específico pelo ID
router.post('/users', ensureAuth, ensureAdmin, usersController.save)  // Cria um novo usuário
router.delete('/users/:id', ensureAuth, ensureAdmin, usersController.delete)  // Deleta um usuário específico pelo ID

module.exports = router  // Exporta o roteador para ser usado em outras partes do projeto
