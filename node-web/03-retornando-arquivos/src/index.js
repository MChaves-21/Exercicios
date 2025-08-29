const express = require('express');

const app = express();

// Configura o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}.`);
});