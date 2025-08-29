// Importa o framework Express para criar o roteamento do servidor
const express = require('express')
// Importa o controlador para as operações relacionadas às listas de tarefas
const taskListController = require('./controllers/taskListController')
// Cria uma instância do roteador do Express
const router = express.Router()
// Define a rota principal que renderiza a página inicial ('index')
router.get('/', (req, res) => res.render('index'))
// Rota para acessar a página principal do aplicativo, provavelmente exibindo listas de tarefas
router.get('/app', taskListController.index)
// Rota para exibir o formulário de criação de uma nova lista de tarefas
router.get('/app/nova-lista', taskListController.create)
// Rota para salvar uma nova lista de tarefas (requisição POST)
router.post('/app/nova-lista', taskListController.save)
// Rota para exibir uma lista específica de tarefas, identificada pelo 'id' passado na URL
router.get('/app/:id', taskListController.show)
// Rota para adicionar uma nova tarefa a uma lista existente, identificada pelo 'id' da lista
router.post('/app/:id/nova-tarefa', taskListController.addTask)
// Rota para excluir uma tarefa de uma lista, identificada pelo 'id' da lista
router.post('/app/:id/excluir', taskListController.delete)
// Rota para marcar uma tarefa como concluída, usando o 'listId' para a lista e 'taskId' para a tarefa
router.post('/app/:listId/completar/:taskId', taskListController.completeTask)
// Rota para desfazer a marcação de conclusão de uma tarefa, novamente usando 'listId' e 'taskId'
router.post('/app/:listId/desfazer/:taskId', taskListController.undoTask)
// Exporta o roteador para ser usado na configuração do servidor Express
module.exports = router
