const n = parseFloat(prompt('escreva um numero de 1 a 20 que voçe quer ver a tabuada'))

let tabuada =''
for (let contador = 1; contador <= 20; contador++) {
    tabuada += `${n} x ${contador} = ${n * contador}\n`;
    
}
alert('Essa é a tabuada do número solicitado:\n' + tabuada);