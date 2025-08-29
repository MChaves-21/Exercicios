// Um array de usuários fictícios. No caso, temos um único usuário com id '1', nome 'Isaac', e-mail, senha e papel de 'admin'.
const users = [
  { id: '1', name: 'Isaac', email: 'isaac@email.com', password: '123456', role: 'admin' }
]

module.exports = {
  // Função para retornar todos os usuários. 
  // Retorna o array completo de usuários.
  findAll: () => users,

  // Função para buscar um usuário pelo ID. 
  // Retorna o primeiro usuário encontrado com o ID fornecido, ou undefined se não encontrar.
  findById: (id) => users.find(user => user.id === id),

  // Função para buscar um usuário pelo e-mail.
  // Retorna o primeiro usuário encontrado com o e-mail fornecido, ou undefined se não encontrar.
  findByEmail: (email) => users.find(user => user.email === email),

  // Função para registrar um novo usuário. 
  // Recebe nome, e-mail e senha, e cria um novo usuário com o papel 'standard'.
  registerUser: (name, email, password) => {
    // Verifica se já existe um usuário com o mesmo e-mail.
    const userAlreadyRegistered = users.find(user => user.email === email)

    // Se o e-mail já estiver em uso, retorna null, indicando que o registro falhou.
    if (userAlreadyRegistered) return null

    // Cria um novo usuário com um id gerado aleatoriamente (número entre 0 e 9999999), nome, e-mail, senha e papel 'standard'.
    const newUser = {
      id: Math.floor(Math.random() * 9999999).toString(),  // Gera um id aleatório para o usuário
      name,
      email,
      password,
      role: 'standard'  // Define o papel como 'standard' por padrão.
    }

    // Adiciona o novo usuário ao array de usuários.
    users.push(newUser)

    // Retorna o novo usuário registrado.
    return newUser
  },

  // Função para criar um novo usuário com papel personalizado.
  // Recebe nome, e-mail, senha e o papel do usuário.
  createUser: (name, email, password, role) => {
    // Verifica se já existe um usuário com o mesmo e-mail.
    const userAlreadyRegistered = users.find(user => user.email === email)

    // Se o e-mail já estiver em uso, retorna null, indicando que o registro falhou.
    if (userAlreadyRegistered) return null

    // Cria um novo usuário com um id gerado aleatoriamente, nome, e-mail, senha e o papel fornecido.
    const newUser = {
      id: Math.floor(Math.random() * 9999999).toString(),  // Gera um id aleatório para o usuário
      name,
      email,
      password,
      role  // O papel do usuário é definido com base no argumento passado (pode ser 'admin', 'standard', etc.).
    }

    // Adiciona o novo usuário ao array de usuários.
    users.push(newUser)

    // Retorna o novo usuário criado.
    return newUser
  },

  // Função para excluir um usuário pelo ID.
  // Busca o índice do usuário no array e, se encontrado, remove e retorna o usuário excluído.
  deleteUser: (id) => {
    // Encontra o índice do usuário no array usando o id fornecido.
    const userIndex = users.findIndex(user => user.id === id)

    // Se o usuário não for encontrado, retorna null, indicando que a exclusão falhou.
    if (userIndex === -1) return null

    // Remove o usuário do array e retorna o usuário excluído.
    const [deletedUser] = users.splice(userIndex, 1)

    // Retorna o usuário excluído.
    return deletedUser
  }
}
