// Importando o modelo de posts para interagir com os dados
const postModel = require("../models/postModel")

// Definindo o controlador de posts, que contém as ações para as rotas
const postsController = { 
  // GET / (Página inicial)
  index: (req, res) => {
    // Obtém todos os posts chamando o método 'getAllPosts' do 'postModel'
    const posts = postModel.getAllPosts()

    // Renderiza a página 'index' e passa a lista de posts como dados para a view
    res.render('index', { posts }) 
    // A view 'index' pode exibir a lista de posts para o usuário
  },

  // GET /posts/:id (Página de exibição de um post específico)
  show: (req, res) => {
    // Obtém o 'id' do post a partir dos parâmetros da URL (req.params.id)
    const id = req.params.id

    // Obtém o post específico chamando o método 'getPostById' do 'postModel'
    const post = postModel.getPostById(id)

    // Renderiza a página 'post' e passa os dados do post como dados para a view
    res.render('post', { post })
    // A view 'post' pode exibir o conteúdo detalhado do post
  }
}

// Exporta o controlador para ser utilizado nas rotas
module.exports = postsController
