const http = require('node:http')

const server = http.createServer((request, response) => {
    const path = request.url

    switch (path) {
        case '/':
            response.writeHead(200)
            response.write('voçe esta na pagina inicial')
            break
        case '/artigos':
            response.writeHead(200)
            response.write('voçe esta na pagina de artigos')
            break
        default:
            response.writeHead(404)
            response.write('Caminho nao encontrado')
            break
        }
        response.end()
})

const port = 3000

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}.`)
})