// Para construir uma função recursiva, geralmente partimos de um caso de base
// para garantir que nossa função não vai continuar se chamando para sempre
// Obs.: !5 (fatorial de 5) = 5 * 4 * 3 * 2 * 1 = 5 * !4
function fatorial(num) {//um numero vai ser injetado,ira ser calculado esse numero menos o seu antecessor.
    console.log("num = " + num);
    if (num === 0 || num === 1) { // casos base
      return 1;
    } else {
      console.log(num + " * " + (num - 1));
      console.log(num * (num - 1));
      return num * fatorial(num - 1);//o valor da multiplicação retornara e sera chamada de novo a função,dessa maneira sera calculada o antecessor * vezes o antecessor,e ficara nesse loop ate chegar ao 0
    }
  }
  
  console.log("\n!3 = " + fatorial(3)); // Deve imprimir 120
  console.log("\n!0 = " + fatorial(0)); // Deve imprimir 1
  console.log("\n!9 = " + fatorial(9)); // Deve imprimir 362880