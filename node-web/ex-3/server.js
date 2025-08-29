const express = require('express');
const app = express();
const routes = require('./routes');  // Caminho para o arquivo de rotas

app.use(express.json());  // Permite que o Express entenda o JSON enviado nas requisições

// Usando as rotas definidas no arquivo 'routes.js'
app.use(routes);

// Defina a porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});