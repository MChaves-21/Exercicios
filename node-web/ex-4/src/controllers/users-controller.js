// Importa o arquivo que contém as funções para manipulação de usuários.
const users = require("../models/users")

module.exports = {
  // GET /users - Rota para listar todos os usuários
  index: (req, res) => {
    // Chama a função findAll() para obter todos os usuários
    const allUsers = users.findAll()

    // Retorna todos os usuários no formato JSON
    res.json(allUsers)
  },

  // GET /users/:id - Rota para obter um usuário específico pelo ID
  show: (req, res) => {
    // Desestruturação para pegar o id da URL (parametro de rota)
    const { id } = req.params

    // Chama a função findById() para buscar o usuário pelo id
    const user = users.findById(id)

    // Se o usuário não for encontrado, retorna erro 404
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Se o usuário for encontrado, retorna o usuário no formato JSON
    res.json(user)
  },

  // POST /users - Rota para criar um novo usuário
  save: (req, res) => {
    // Desestruturação para pegar os dados do corpo da requisição
    const { name, email, password, role } = req.body

    // Valida os dados recebidos: verifica se name, email e password são strings, 
    // e se o role é uma string válida ('admin' ou 'standard')
    if (
      typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' ||
      typeof role !== 'string' || !role.match(/^(admin|standard)$/)
    ) {
      // Se os dados forem inválidos, retorna erro 400 com a mensagem 'Invalid fields!'
      return res.status(400).json({ message: 'Invalid fields!' })
    }

    // Chama a função createUser() para criar um novo usuário
    const newUser = users.createUser(name, email, password, role)

    // Se o usuário não foi criado (por exemplo, se o e-mail já está em uso), retorna erro 400
    if (!newUser) return res.status(400).json({ message: 'Email already in use' })

    // Se o usuário for criado com sucesso, retorna o novo usuário com o status 201 (Created)
    res.status(201).json(newUser)
  },

  // DELETE /users/:id - Rota para excluir um usuário pelo ID
  delete: (req, res) => {
    // Desestruturação para pegar o id da URL
    const { id } = req.params

    // Chama a função findById() para verificar se o usuário existe
    const user = users.findById(id)

    // Se o usuário não for encontrado, retorna erro 404
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Chama a função deleteUser() para excluir o usuário
    const deletedUser = users.deleteUser(id)

    // Se a exclusão falhar por algum motivo, retorna erro 400
    if (!deletedUser) return res.status(400).json({ message: "Couldn't delete user" })

    // Se a exclusão for bem-sucedida, retorna o usuário excluído
    res.json(deletedUser)
  }
}
