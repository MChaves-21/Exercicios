// Simulando um banco de dados em memória com um array de posts
let posts = [{
  id: '1', // Identificador único do post
  title: 'teste', // Título do post
  content: 'gefgsdfg', // Conteúdo do post
  createdAt: new Date(), // Data de criação do post
  updatedAt: new Date() // Data de última atualização do post
}]

// Definindo o modelo de posts, que contém funções para manipulação dos dados
const postModel = {

  // Função para obter todos os posts
  getAllPosts() {
    return posts // Retorna todos os posts armazenados no array 'posts'
  },

  // Função para obter um post específico pelo ID
  getPostById(id) {
    return posts.find(post => post.id === id) // Busca e retorna o post com o ID fornecido
  },

  // Função para criar um novo post
  createPost(title, content) {
    const post = {
      id: Date.now().toString(), // Gera um ID único baseado no timestamp atual
      title: title, // Define o título do post a partir do argumento
      content: content, // Define o conteúdo do post a partir do argumento
      createdAt: new Date(), // Define a data de criação como o momento atual
      updatedAt: new Date() // Define a data de atualização como o momento atual
    }
    return post // Retorna o post recém-criado, mas ainda não o adiciona ao array
  },

  // Função para salvar (adicionar) um novo post no array 'posts'
  savePost(post) {
    posts.unshift(post) // Adiciona o post à primeira posição do array (inicio)
  },

  // Função para atualizar um post existente
  updatePost(id, updatedPost) {
    const index = posts.findIndex(post => post.id === id) // Encontra o índice do post com o ID fornecido
    posts[index] = { ...posts[index], ...updatedPost, updatedAt: new Date() } // Atualiza as informações do post com os dados de 'updatedPost' e define a nova data de atualização
  },

  // Função para excluir um post com base no ID
  deletePost(id) {
    posts = posts.filter(post => post.id !== id) // Filtra os posts, removendo o post com o ID fornecido
  }
}

// Exporta o modelo de posts para ser utilizado em outras partes da aplicação
module.exports = postModel
