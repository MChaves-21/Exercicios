let playlists = [
    {
        id: 1,
        nome: "Rock Hits",
        tags: ["rock", "anos 90"],
        musicas: [
            { titulo: "Smells Like Teen Spirit", ano: 1991, artista: "Nirvana", album: "Nevermind" },
            { titulo: "Bohemian Rhapsody", ano: 1975, artista: "Queen", album: "A Night at the Opera" },
        ]
    }
];

module.exports = {
    //funçao para retornar todas as playlist

    index: (req, res) => {
        res.json(playlists)
    },

    playlistsId: (req, res) => {
        const { id } = req.params
        const playlist_especifica = playlists.find(playlist_especifica => playlist_especifica.id === +id)//esse +id converte o id em um numero
        //pequena valiudação
        if (!playlist_especifica) {
            res.status(404)  // Define o status como "não encontrado"
            res.json({ message: "playlist_especifica não encontrada" })  // Retorna uma mensagem de erro
        } else {
            res.json(playlist_especifica)  // Se encontrado, retorna a playlist em formato JSON
        }
    },
    new: (req, res) => {
        const { nome, tags, musicas } = req.body;

        // Verifica se 'nome' e 'tags' foram enviados
        if (!nome || !tags) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        // Cria a nova playlist com músicas ou com array vazio
        const newPlaylist = {
            id: Math.floor(Math.random() * 999999), // Gera um ID aleatório
            nome: nome,
            tags: tags,
            musicas: musicas || [] // Se 'musicas' não for enviado, atribui um array vazio
        };

        // Adiciona a nova playlist à lista de playlists
        playlists.push(newPlaylist);

        // Retorna a playlist criada com status 201
        res.status(201).json(newPlaylist);
    },
    update: (req, res) => {
        const { id } = req.params
        const { nome, tags } = req.body
        const playlistIndex = playlists.findIndex(playlists => playlists.id === +id)
        if (playlistIndex === -1) {
            return res.status(404).json({ message: "playlist nao encontrada" })
        }
        playlists[playlistIndex].nome = nome
        playlists[playlistIndex].tags = tags
        res.json(playlists[playlistIndex])
    },
    excluir: (req, res) => {
        const { id } = req.params
        const playlistIndex = playlists.findIndex(playlists => playlists.id === +id)
        if (playlistIndex === -1) {
            return res.status(404).json({ message: "playlist nao encontrada" })
        }
        playlists.splice(playlistIndex, 1)
        res.status(204).end()
    },
    adicionar_musica: (req, res) => {
        const { id } = req.params; // ID da playlist na URL
        const { musicas } = req.body; // Músicas a serem adicionadas no corpo da requisição
    
        // Verifica se musicas é um array
        if (!Array.isArray(musicas)) {
            return res.status(400).json({ message: 'Invalid music format. Expected an array.' });
        }
    
        // Encontra o índice da playlist pelo ID
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id);
    
        // Verifica se a playlist foi encontrada
        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist não encontrada" });
        }
    
        // Verifica se as músicas já existem na playlist
        musicas.forEach(musica => {
            const musicaExistente = playlists[playlistIndex].musicas.some(m => m.titulo === musica.titulo && m.artista === musica.artista);
            if (musicaExistente) {
                return res.status(400).json({ message: `A música "${musica.titulo}" já está na playlist.` });
            }
        });
    
        // Adiciona as músicas à playlist
        playlists[playlistIndex].musicas.push(...musicas);
    
        // Retorna a playlist atualizada
        res.status(200).json(playlists[playlistIndex]);
    },
    delete_musica: (req, res) => {
        const { id } = req.params; // ID da playlist
        const { titulo } = req.params; // Título da música a ser removida
    
        // Encontra o índice da playlist pelo ID
        const playlistIndex = playlists.findIndex(playlist => playlist.id === +id);
    
        // Verifica se a playlist foi encontrada
        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist não encontrada" });
        }
    
        // Busca a música pela propriedade 'titulo'
        const musicaIndex = playlists[playlistIndex].musicas.findIndex(m => m.titulo === titulo);
    
        // Verifica se a música foi encontrada
        if (musicaIndex === -1) {
            return res.status(404).json({ message: "Música não encontrada" });
        }
    
        // Remove a música da playlist
        playlists[playlistIndex].musicas.splice(musicaIndex, 1);
    
        // Retorna a playlist atualizada
        res.status(200).json(playlists[playlistIndex]);
    }
    
}