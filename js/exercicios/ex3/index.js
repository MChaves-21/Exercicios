// Solicita ao usuário que insira um valor em metros
let valor = parseFloat(prompt('Digite um valor em metros'));

// Solicita ao usuário que escolha uma unidade de medida
const alternativa = prompt(
    'Escolha uma das alternativas:\n' +
    'milímetro (mm)\n' +
    'centímetro (cm)\n' +
    'decímetro (dm)\n' +
    'decâmetro (dam)\n' +
    'hectômetro (hm)\n' +
    'quilômetro (km)'
);
// Converte o valor de acordo com a unidade escolhida
switch (alternativa.toLowerCase()) {
    case 'milímetro':
    case 'mm':
        valor = valor * 1000;
        alert(`O valor convertido é ${valor} mm.`);
        break;
    case 'centímetro':
    case 'cm':
        valor = valor * 100;
        alert(`O valor convertido é ${valor} cm.`);
        break;
    case 'decímetro':
    case 'dm':
        valor = valor * 10;
        alert(`O valor convertido é ${valor} dm.`);
        break;
    case 'decâmetro':
    case 'dam':
        valor = valor / 10;
        alert(`O valor convertido é ${valor} dam.`);
        break;
    case 'hectômetro':
    case 'hm':
        valor = valor / 100;
        alert(`O valor convertido é ${valor} hm.`);
        break;
    case 'quilômetro':
    case 'km':
        valor = valor / 1000;
        alert(`O valor convertido é ${valor} km.`);
        break;
    default:
        alert('Escolha inválida. Tente novamente.');
}
/*const medida = parseFloat(prompt("Insira uma medida em metros:"))
Depois pedimos ao usuário para escolher a unidade para a conversão:
const unidade = prompt(
  "Para qual unidade de medida deseja converter?" +
  "\n1 - milímetros (mm)" +
  "\n2 - centímetros (cm)" +
  "\n3 - decímetros (dm)" +
  "\n4 - decâmetros (dam)" +
  "\n5 - hectômetro (hm)" +
  "\n6 - quilômetro (km)"
)
Por fim usamos o switch para mostrar os resultados de acordo com as diferentes opções:
switch (unidade) {
  case "1":
    alert("Resultado: " + medida + "m = " + medida * 1000 + "mm")
  case "2":
    alert("Resultado: " + medida + "m = " + medida * 100 + "cm")
  case "3":
    alert("Resultado: " + medida + "m = " + medida * 10 + "dm")
  case "4":
    alert("Resultado: " + medida + "m = " + medida / 10 + "dam")
  case "5":
    alert("Resultado: " + medida + "m = " + medida / 100 + "hm")
  case "6":
    alert("Resultado: " + medida + "m = " + medida / 1000 + "km")
}
E incluímos também um bloco default e os breaks em cada case para garantir que o default não seja ativado:
switch (unidade) {
  case "1":
    alert("Resultado: " + medida + "m = " + medida * 1000 + "mm")
    break
  case "2":
    alert("Resultado: " + medida + "m = " + medida * 100 + "cm")
    break
  case "3":
    alert("Resultado: " + medida + "m = " + medida * 10 + "dm")
    break
  case "4":
    alert("Resultado: " + medida + "m = " + medida / 10 + "dam")
    break
  case "5":
    alert("Resultado: " + medida + "m = " + medida / 100 + "hm")
    break
  case "6":
    alert("Resultado: " + medida + "m = " + medida / 1000 + "km")
    break
  default:
    alert("Opção inválida!")
    break
}*/
