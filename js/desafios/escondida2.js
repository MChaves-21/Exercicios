function invertWord(word) {
    return word.toLowerCase().split('').reverse().join('')//passa as palavras para minusculo,divide em letras,inverte,junta as letras
  }
  
  function invertWords(str) {
    return str.split(' ')//separando a string em palavras
    .map(invertWord)//.map vai criar um novo array e vain chamar a funçao invert world em cada palavra
    .join(' ')// map: permite obter um novo array a partir de um array existenste
    //join vai juntar as palavras
  }