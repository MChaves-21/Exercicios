let express = require('express')
const path = require('node:path')
const app = express()

// Array para armazenar os e-mails em memória
let emails = [];
// Middleware para servir arquivos estáticos na pasta public
app.use(express.static('public'))
// Configura o motor de visualização (EJS) e o diretório das views
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware para decodificar o corpo das requisições
app.use(express.urlencoded({ extended: true }))

//O usuário acessa /form para preencher o formulário.
//Ao enviar o formulário, os dados vão para a rota /register via POST.
//Na rota /register, você pode acessar esses dados através de req.body.name e req.body.senha.

// Rota GET para exibir o formulário de registro (onde os usuários irão inserir dados)
app.get('/', (req, res) => {
    res.render('form');
});
// Rota POST para lidar com os dados do formulario
// Rota para lidar com o cadastro de e-mails
app.post('/signup', (req, res) => {
    const { email } = req.body;

    if (email) {
        emails.push(email);
        res.redirect('/sucesso');
    } else {
        res.redirect('/');
    }
});
//rota para caso o cadastro tenha dado certo
app.get('/sucesso', (req, res) => {
    res.render('sus')
})


// Rota GET para listar os usuários registrados
// Rota para a página de visualização dos e-mails cadastrados
app.get('/emails', (req, res) => {
    res.render('users', { emails: emails });//O primeiro emails é a chave, e o segundo emails é a variável que contém os dados
});
// Rota para excluir um e-mail da lista
app.post('/emails/delete', (req, res) => {
    const { email } = req.body;
    emails = emails.filter(item => item !== email);
    res.redirect('/emails');
});

// Definir a porta em que o servidor vai rodar
let port = 3000
app.listen(port, () => {
    console.log('Servidor conectado na porta 3000 com sucesso!')
})
