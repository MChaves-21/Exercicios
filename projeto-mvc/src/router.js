const express = require('express');
const listaTarefas = require('./controllers/listaTarefas'); // Importa o controlador
const { taf } = require('./controllers/listaTarefas'); // Importa o array de tarefas
const router = express.Router();

// Rota para renderizar a página inicial com o array de tarefas
router.get('/', listaTarefas.index);

// Rota para exibir a lista de tarefas
router.get('/tarefas', listaTarefas.tarefas);

// Rota para excluir uma tarefa
router.post('/excluir/:id', (req, res) => {
  const idToDelete = req.params.id; // Recupera o id da tarefa a ser excluída

  // Filtra o array original, removendo a tarefa com o id especificado
  const updatedTaf = taf.filter(tarefa => tarefa.id !== idToDelete);

  // Após a exclusão, renderiza novamente a página com o array atualizado
  res.render('tarefas', { taf: updatedTaf });
});

module.exports = router;
