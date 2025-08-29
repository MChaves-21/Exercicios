const express = require('express')

const server = express()

server.get('/',(resquest,response)=>{
    response.send('Servidor express funcionando \n voçe esta na pagina inicial.')
})

server.get('/artigos',(req,res)=>{
    res.send('servidor express funcionando \n na pagina artigos')
})

const port =3000
server.listen(port,()=>{
    console.log(`servidor exprres iniciado em http://localhost:${port}.`)
})