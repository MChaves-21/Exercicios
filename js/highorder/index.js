function exibirElemento(elemento, indice, array) {
    console.log({
      elemento,
      indice,
      array
    })
  }
  
  const lista = ["Maçã", "Banana", "Laranja", "Limão", "Uva"]
  // Forma tradicional
  for (let i = 0; i < lista.length; i++) {
    exibirElemento(lista[i], i, lista)
  }
  // Forma funcional
  lista.forEach(exibirElemento)//x.forEacg para cada elemento de x ele vai chamar a funçao
  // Também poderia ser feito:
  lista.forEach(function (elemento, indice, array) {
    console.log({
      elemento,
      indice,
      array
    })
  })