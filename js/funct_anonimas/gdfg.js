// Funções anônimas só podem ser chamadas após a atribuição da variável,
// elas não são jogadas para o topo do arquivo como funções normais
olaMundo()


function olaMundo() {
  console.log("Olá, mundo!")
}

let oiMundo = function () {
  console.log("Oi, mundo!")
}
oiMundo()//funçoes anonimas so ficam disponiveis apos a inicialização