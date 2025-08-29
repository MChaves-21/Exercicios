function squareDigits(num) {
    const str = num.toString(); // Converte o número para uma string
    let result = ""; // Inicializa uma string para armazenar o resultado
  
    for (let i = 0; i < str.length; i++) {
        // Calcula o quadrado do dígito atual e concatena ao resultado
        result += (Number(str[i]) ** 2).toString();
    }
  
    return Number(result); // Converte o resultado final para um número
}

console.log(squareDigits(91));
//resolução otimizada
