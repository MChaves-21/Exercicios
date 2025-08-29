const express = require('express');
const router = express.Router();
const controller = require('controller/playlist.js');  // Caminho correto para o seu controlador

// Rota para retornar todas as playlists
router.get('/playlists', controller.index);

// Rota para retornar uma playlist específica pelo ID
router.get('/playlists/:id', controller.playlistsId);

// Rota para criar uma nova playlist
router.post('/playlists', controller.new);

// Rota para atualizar uma playlist existente
router.put('/playlists/:id', controller.update);

// Rota para excluir uma playlist
router.delete('/playlists/:id', controller.excluir);

// Rota para adicionar músicas a uma playlist
router.post('/playlists/:id/musicas', controller.adicionar_musica);

// Rota para excluir uma música de uma playlist
router.delete('/playlists/:id/musicas/:titulo', controller.delete_musica);

module.exports = router;
