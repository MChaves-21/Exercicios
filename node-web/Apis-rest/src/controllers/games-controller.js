const games = [
  { id: 1, name: 'Legend of Mana', genres: ['action-rpg'], year: 1999 },
  { id: 2, name: 'World of Warcraft', genres: ['mmorpg'], year: 2004 },
  { id: 3, name: 'Metal Gear Solid', genres: ['stealth', 'action-adventure'], year: 1998 },
  { id: 4, name: 'Sonic Adventure 2', genres: ['platformer'], year: 2001 },
  { id: 5, name: 'Age of Empires 2', genres: ['real-time-strategy'], year: 1999 }
]

module.exports = {
  // GET /games - Rota para listar todos os jogos
  index: (req, res) => {
    // Retorna todos os jogos no formato JSON
    res.json(games)
  },

  // GET /games/:id - Rota para obter um jogo específico pelo ID
  show: (req, res) => {
    // Obtém o parâmetro 'id' da URL (ex: /games/2)
    const { id } = req.params

    // Busca o jogo com o 'id' especificado
    const game = games.find(game => game.id === +id)

    // Se o jogo não for encontrado, retorna um erro 404
    if (!game) {
      res.status(404)  // Define o status como "não encontrado"
      res.json({ message: "Game not found!" })  // Retorna uma mensagem de erro
    } else {
      res.json(game)  // Se encontrado, retorna o jogo em formato JSON
    }
  },

  // POST /games - Rota para criar um novo jogo
  save: (req, res) => {
    // Obtém os dados do novo jogo enviados no corpo da requisição
    const { name, genres, year } = req.body

    // Cria um novo objeto de jogo com um id aleatório
    const newGame = {
      id: Math.floor(Math.random() * 999999),  // Gera um ID aleatório
      name,
      genres,
      year
    }

    // Adiciona o novo jogo à lista de jogos
    games.push(newGame)

    // Retorna o jogo recém-criado com o status 201 (Criado)
    res.status(201)
    res.json(newGame)
  },

  // POST /games/:id/genres - Rota para adicionar um gênero a um jogo específico
  addGenre: (req, res) => {
    // Obtém o 'id' do jogo da URL e o 'genre' do corpo da requisição
    const { id } = req.params
    const { genre } = req.body

    // Encontra o índice do jogo no array 'games'
    const gameIndex = games.findIndex(game => game.id === +id)

    // Se o jogo não for encontrado, retorna um erro 404
    if (gameIndex === -1) {
      return res.status(404).json({ message: 'Game not found!' })
    }

    // Se o gênero for inválido ou já existir no jogo, retorna erro 400
    if (typeof genre !== 'string' || games[gameIndex].genres.includes(genre)) {
      return res.status(400).json({ message: 'Invalid genre!' })
    }

    // Adiciona o novo gênero ao jogo
    games[gameIndex].genres.push(genre)

    // Retorna o jogo atualizado com o novo gênero
    res.json(games[gameIndex])
  },

  // PUT /games/:id - Rota para atualizar um jogo existente
  update: (req, res) => {
    // Obtém o 'id' do jogo da URL e os novos dados do jogo do corpo da requisição
    const { id } = req.params
    const { name, year } = req.body

    // Encontra o índice do jogo no array 'games'
    const gameIndex = games.findIndex(game => game.id === +id)

    // Se o jogo não for encontrado, retorna um erro 404
    if (gameIndex === -1) {
      return res.status(404).json({ message: "Game not found!" })
    }

    // Atualiza o nome e o ano do jogo
    games[gameIndex].name = name
    games[gameIndex].year = year

    // Retorna o jogo atualizado
    res.json(games[gameIndex])
  },

  // DELETE /games/:id - Rota para excluir um jogo
  delete: (req, res) => {
    // Obtém o 'id' do jogo da URL
    const { id } = req.params

    // Encontra o índice do jogo no array 'games'
    const gameIndex = games.findIndex(game => game.id === +id)

    // Se o jogo não for encontrado, retorna um erro 404
    if (gameIndex === -1) {
      return res.status(404).json({ message: "Game not found!" })
    }

    // Remove o jogo da lista
    games.splice(gameIndex, 1)

    // Retorna um status 204 (sem conteúdo) para indicar que o jogo foi excluído
    res.status(204).end()
  },

  // DELETE /games/:id/genres/:name - Rota para remover um gênero de um jogo específico
  removeGenre: (req, res) => {
    // Obtém o 'id' do jogo e o 'name' do gênero da URL
    const { id, name } = req.params

    // Encontra o índice do jogo no array 'games'
    const gameIndex = games.findIndex(game => game.id === +id)

    // Se o jogo não for encontrado, retorna um erro 404
    if (gameIndex === -1) {
      return res.status(404).json({ message: 'Game not found!' })
    }

    // Se o nome do gênero for inválido ou não estiver no jogo, retorna erro 400
    if (!name || typeof name !== 'string' || !games[gameIndex].genres.includes(name)) {
      return res.status(400).json({ message: 'Invalid genre!' })
    }

    // Remove o gênero do jogo
    games[gameIndex].genres = games[gameIndex].genres.filter(genre => genre !== name)

    // Retorna um status 204 (sem conteúdo) para indicar que a remoção foi bem-sucedida
    res.status(204).end()
  }
}
//Cada função dentro do código é associada a uma rota da API.
//As rotas permitem realizar operações como listar, buscar, criar, atualizar, excluir jogos, adicionar e remover gêneros.
//O uso de req e res segue o padrão das APIs RESTful: req para acessar os dados da requisição e res para retornar a resposta ao cliente.