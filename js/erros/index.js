//Podemos utilizar o bloco try para “tentar” executar uma parte do nosso código e juntamente com ele um bloco catch para “capturar” os erros e executar um código em caso de erro:
function sum(a, b) {
    const firstNumber = Number(a)
    const secondNumber = Number(b)

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        throw new Error('arguments must be two numbers')
    }

    return firstNumber + secondNumber
}

try {
    console.log(sum(2, 9))
    console.log(sum(true, 14))
    console.log(sum(undefined, 22))
    console.log(sum(18, "0"))
    console.log(sum(39, null))
    console.log(sum(13, "zero"))
} catch {
    console.log("An error ocurred!")
}
// finally, que irá executar depois do bloco try caso dê tudo certo ou depois do bloco catch caso um erro tenha ocorrido.
finally {
    console.log('Calculations finished.')
}