// Definição de tipos para representar a situação do planeta
type PlanetSituation = 'Habitado' | 'Habitável' | 'Inabitável' | 'Inexplorado';

// Definição de tipo para coordenadas do planeta como um tupla de 4 números
type PlanetCoordinates = [number, number, number, number];

// Definição do tipo Planet, que representa um planeta
type Planet = {
  name: string; // Nome do planeta
  coordinates: PlanetCoordinates; // Coordenadas do planeta
  situation: PlanetSituation; // Situação do planeta
  satellites: string[]; // Lista de satélites do planeta
}

// Array para armazenar os planetas
const planets: Planet[] = [];

// Função para adicionar um novo planeta ao array
function addPlanet(name: string, coordinates: PlanetCoordinates, situation: PlanetSituation) {
  planets.push({
    name,
    coordinates,
    situation,
    satellites: [] // Inicializa a lista de satélites como vazia
  });

  alert(`O planeta ${name} foi salvo com sucesso.`);
}

// Função para encontrar um planeta pelo nome
function findPlanet(name: string) {
  const planet = planets.find(planet => planet.name === name); // Busca no array

  return planet ?? false; // Retorna o planeta encontrado ou false se não existir
}

// Função para atualizar a situação de um planeta
function updateSituation(situation: PlanetSituation, planet: Planet) {
  planet.situation = situation; // Atualiza a situação do planeta

  alert(`A situação do planeta ${planet.name} foi atualizada para "${situation}".`);
}

// Função para adicionar um satélite a um planeta
function addSatellite(name: string, planet: Planet) {
  planet.satellites.push(name); // Adiciona o satélite ao array de satélites

  alert(`O satélite ${name} foi adicionado ao planeta ${planet.name}.`);
}

// Função para remover um satélite de um planeta
function removeSatellite(name: string, planet: Planet) {
  planet.satellites = planet.satellites.filter(satellite => satellite !== name); // Filtra o satélite a ser removido

  alert(`O satélite ${name} foi removido do planeta ${planet.name}.`);
}

// Função para solicitar uma situação válida do usuário
function promptValidSituation() {
  let situation: PlanetSituation;
  let validSituation = false;

  while (!validSituation) {
    const situationInput = prompt('Informe a situação do planeta?\n1 - Habitado\n2 - Habitável\n3 - Inabitável\n4 - Inexplorado');

    // Verifica a entrada do usuário
    switch (situationInput) {
      case '1':
        situation = 'Habitado';
        validSituation = true;
        break;
      case '2':
        situation = 'Habitável';
        validSituation = true;
        break;
      case '3':
        situation = 'Inabitável';
        validSituation = true;
        break;
      case '4':
        situation = 'Inexplorado';
        validSituation = true;
        break;
      default:
        alert('Situação inválida!'); // Mensagem de erro para entrada inválida
        break;
    }
  }

  return situation; // Retorna a situação válida
}

// Função para solicitar um planeta e executar um callback
function promptValidPlanet(callback: (planet: Planet) => void) {
  const planetName = prompt('Informe o nome do planeta:');
  const planet = findPlanet(planetName); // Busca o planeta

  if (planet) {
    callback(planet); // Se encontrado, chama o callback
  } else {
    alert('Planeta não encontrado! Retornando ao menu...'); // Mensagem se o planeta não for encontrado
  }
}

// Função para a primeira opção do menu
function firstMenuOption() {
  const name = prompt('Informe o nome do planeta:');
  const coordinateA = Number(prompt('Informe a primeira coordenada:'));
  const coordinateB = Number(prompt('Informe a segunda coordenada:'));
  const coordinateC = Number(prompt('Informe a terceira coordenada:'));
  const coordinateD = Number(prompt('Informe a quarta coordenada:'));

  const situation = promptValidSituation(); // Solicita a situação do planeta

  const confirmation = confirm(`Confirma o registro do planeta ${name}?
    Coordenadas: (${coordinateA}, ${coordinateB}, ${coordinateC}, ${coordinateD})
    Situação: ${situation}`); // Confirmação antes de adicionar

  if (confirmation) {
    addPlanet(name, [coordinateA, coordinateB, coordinateC, coordinateD], situation); // Adiciona o planeta
  }
}

// Função para a segunda opção do menu
function secondMenuOption() {
  promptValidPlanet(planet => {
    const situation = promptValidSituation(); // Solicita nova situação
    updateSituation(situation, planet); // Atualiza a situação do planeta
  });
}

// Função para a terceira opção do menu
function thirdMenuOption() {
  promptValidPlanet(planet => {
    const satellite = prompt('Informe o nome do satélite a ser adicionado:');
    addSatellite(satellite, planet); // Adiciona o satélite ao planeta
  });
}

// Função para a quarta opção do menu
function fourthMenuOption() {
  promptValidPlanet(planet => {
    const satellite = prompt('Informe o nome do satélite a ser removido:');
    removeSatellite(satellite, planet); // Remove o satélite do planeta
  });
}

// Função para a quinta opção do menu
function fifthMenuOption() {
  let list = 'Planetas:\n';

  planets.forEach(planet => {
    const [a, b, c, d] = planet.coordinates; // Desestrutura as coordenadas

    // Monta a lista de planetas
    list += `
      Nome: ${planet.name}
      Coordenadas: (${a}, ${b}, ${c}, ${d})
      Situação: ${planet.situation}
      Satélites: ${planet.satellites.length}
    `;

    planet.satellites.forEach(satellite => {
      list += `    - ${satellite}\n`; // Adiciona os satélites à lista
    });
  });

  alert(list); // Exibe a lista de planetas
}

let userOption = 0;

// Loop principal do menu
while (userOption !== 6) {
  const menu = `Menu
    1 - Registrar um novo planeta
    2 - Atualizar situação do planeta
    3 - Adicionar um satélite ao planeta
    4 - Remover um satélite do planeta
    5 - Lista todos os planetas
    6 - Sair
  `;

  userOption = Number.parseInt(prompt(menu)); // Obtém a opção do usuário

  // Switch para gerenciar as opções do menu
  switch (userOption) {
    case 1:
      firstMenuOption(); // Registrar novo planeta
      break;
    case 2:
      secondMenuOption(); // Atualizar situação do planeta
      break;
    case 3:
      thirdMenuOption(); // Adicionar satélite
      break;
    case 4:
      fourthMenuOption(); // Remover satélite
      break;
    case 5:
      fifthMenuOption(); // Listar planetas
      break;
    case 6:
      alert('Encerrando o sistema...'); // Mensagem ao sair
      break;
    default:
      alert('Opção inválida! Retornando ao painel principal...'); // Mensagem para opção inválida
      break;
  }
}
