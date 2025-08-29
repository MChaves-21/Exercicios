const average = (...numbers) => {
    const sum = numbers.reduce((accum, num) => accum + num, 0)
    return sum / numbers.length
}

console.log(`Média Aritmética Simples: ${average(3, 6, 10, 9)}`)

const weightedAverage = (...entries) => {
    const sum = entries.reduce((accum, { number, weight }) => accum + (number * (weight ?? 1)), 0)
    const weightSum = entries.reduce((accum, entry) => accum + (entry.weight ?? 1), 0)
    return sum / weightSum
}

console.log(`Média Ponderada: ${weightedAverage(
    { number: 9, weight: 3 },
    { number: 7 },
    { number: 10, weight: 1 },
)}`)

const median = (...numbers) => {
    const orderedNumbers = [...numbers].sort((a, b) => a - b)//ordena os numeros em ordem crecente
    const middle = Math.floor(orderedNumbers.length / 2)// Calcula o índice do meio da lista ordenada
    if (orderedNumbers.length % 2 !== 0) {//se o numero de elementos for impar retorna o elemento do meio
        return orderedNumbers[middle]
    }
    const firstMedian = orderedNumbers[middle - 1]//se o numero de elementos for par calcula a media dos dois elementos do meio
    const secondMedian = orderedNumbers[middle]
    return average(firstMedian, secondMedian)
}

console.log(`Mediana: ${median(2, 5, 99, 4, 42, 7)}`)
console.log(`Mediana: ${median(15, 14, 8, 7, 3)}`)

const mode = (...numbers) => {
    // [ [n, qtd], [n, qtd], [n, qtd] ]
     // Cria um array que contém pares [número, quantidade],onde 'número' é o número original e 'quantidade' é a frequência desse número na lista.
    const quantities = numbers.map(num => [
        num,// O número atual sendo iterado
        numbers.filter(n => num === n).length // Conta quantas vezes 'num' aparece em 'numbers'
    ])
    // Ordena o array 'quantities' em ordem decrescente,com base na segunda posição do array,quantidade.
    quantities.sort((a, b) => b[1] - a[1])
    // Retorna o número que aparece com mais frequência
    return quantities[0][0]
}

console.log(`Moda: ${mode(1, 1, 99, 99, 99, 99, 99, 99, 99, 99, 5, 4, 9, 7, 4, 3, 5, 2, 4, 0, 4)}`)