// Importa o modelo que manipula os dados das listas de tarefas
const taskListModel = require("../models/taskListModel")

//exportando as funçoes
module.exports = {
  // GET /app
  // Rota para exibir todas as listas de tarefas
  index: (req, res) => {
    // Obtém todas as listas de tarefas do modelo
    const taskLists = taskListModel.getAllTaskLists()
    // Renderiza a página 'app.ejs', passando as listas de tarefas como dados para o template
    res.render('app', { taskLists })
  },
  // GET /app/nova-lista
  // Rota para exibir o formulário de criação de uma nova lista de tarefas
  create: (req, res) => {
    // Renderiza o template 'create.ejs', que contém o formulário para criar uma nova lista
    res.render('create.ejs')
  },

  // POST /app/nova-lista
  // Rota para salvar uma nova lista de tarefas
  save: (req, res) => {
    // Obtém o título da nova lista a partir do corpo da requisição (formulário)
    const { title } = req.body

    // Cria uma nova lista de tarefas no modelo
    const newList = taskListModel.createList(title)

    // Salva a nova lista usando o método do modelo
    taskListModel.saveList(newList)

    // Redireciona o usuário de volta para a página principal de listas de tarefas
    res.redirect('/app')
  },

  // GET /app/:id
  // Rota para exibir uma lista de tarefas específica, identificada pelo 'id'
  show: (req, res) => {
    // Obtém o 'id' da lista a partir dos parâmetros da URL
    const { id } = req.params

    // Caso o id não exista, lança um erro (pode ser tratado de forma mais robusta)
    if (!id) throw new Error('Lista de tarefas não encontrada!')

    // Obtém a lista de tarefas específica pelo 'id'
    const taskList = taskListModel.getTaskListById(id)

    // Renderiza a página 'show.ejs' passando a lista de tarefas para o template
    res.render('show', { taskList })
  },

  // POST /app/:id/excluir
  // Rota para excluir uma lista de tarefas específica, identificada pelo 'id'
  delete: (req, res) => {
    // Obtém o 'id' da lista a partir dos parâmetros da URL
    const { id } = req.params

    // Chama o método do modelo para excluir a lista de tarefas com o 'id' fornecido
    taskListModel.deleteList(id)

    // Redireciona o usuário de volta para a página principal de listas de tarefas
    res.redirect('/app')
  },

  // POST /app/:id/nova-tarefa
  // Rota para adicionar uma nova tarefa a uma lista específica
  addTask: (req, res) => {
    // Obtém o 'id' da lista e o título da nova tarefa a partir da requisição
    const { id } = req.params
    const { title } = req.body

    // Adiciona a nova tarefa à lista específica usando o método do modelo
    taskListModel.addTask(id, title)

    // Redireciona o usuário para a página da lista de tarefas onde a nova tarefa foi adicionada
    res.redirect(`/app/${id}`)
  },

  // POST /app/:listId/completar/:taskId
  // Rota para marcar uma tarefa como concluída
  completeTask: (req, res) => {
    // Obtém o 'listId' e 'taskId' dos parâmetros da URL
    const { listId, taskId } = req.params

    // Marca a tarefa como concluída usando o modelo
    taskListModel.completeTask(listId, taskId)

    // Redireciona o usuário para a página da lista de tarefas
    res.redirect(`/app/${listId}`)
  },

  // POST /app/:listId/desfazer/:taskId
  // Rota para desfazer a conclusão de uma tarefa
  undoTask: (req, res) => {
    // Obtém o 'listId' e 'taskId' dos parâmetros da URL
    const { listId, taskId } = req.params

    // Desfaz a marcação de conclusão da tarefa usando o modelo
    taskListModel.undoTask(listId, taskId)

    // Redireciona o usuário para a página da lista de tarefas
    res.redirect(`/app/${listId}`)
  }
}
