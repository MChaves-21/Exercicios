function media(...numeros) {
    // 'numeros' é um array que contém todos os argumentos passados para a função
    let somas = 0
    for(let i = 0;i<=numeros.length-1;i++){//vai inicializar com 0 pq ela esta percorrendo um array que comessa com 0
        somas+=numeros[i]
    }    
    return somas/numeros.length
}
console.log(media(2,5,7,1,-2))
//resoluçao dele
function average(...numbers) {
    return numbers.reduce((accum, num) => accum + num, 0) / numbers.length
  }