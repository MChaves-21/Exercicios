// Define a estrutura de resposta do usuário do GitHub
interface GithubUserResponse {
    id: number // ID único do usuário
    login: string // Nome de login do usuário no GitHub
    name: string // Nome completo do usuário
    bio: string // Biografia do usuário
    public_repos: number // Número de repositórios públicos do usuário
    repos_url: string // URL para acessar os repositórios do usuário
    message?: "Not Found" // Mensagem de erro se o usuário não for encontrado
}

// Define a estrutura de resposta dos repositórios do GitHub
interface GithubRepoResponse {
    name: string // Nome do repositório
    description: string // Descrição do repositório
    fork: boolean // Indica se o repositório é um fork
    stargazers_count: number // Número de estrelas que o repositório recebeu
}

// Array para armazenar usuários do GitHub
const users: GithubUserResponse[] = [];

// Função assíncrona para buscar informações de um usuário
async function fetchUser(username: string) {
    // Faz uma requisição para a API do GitHub usando o nome de usuário
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user: GithubUserResponse = await response.json(); // Converte a resposta em JSON

    // Verifica se a resposta contém uma mensagem de erro
    if (user.message) {
        alert('Usuário não encontrado!'); // Alerta se o usuário não foi encontrado
    } else {
        users.push(user); // Adiciona o usuário ao array

        // Mostra informações do usuário em um alerta
        alert(
            `O usuário ${user.login} foi salvo.\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`
        );
    }
}

// Função assíncrona para mostrar informações detalhadas de um usuário
async function showUser(username: string) {
    // Busca o usuário no array de usuários
    const user = users.find(user => user.login === username);

    // Se o usuário não for encontrado, mostra um alerta
    if (typeof user === 'undefined') {
        alert('Usuário não encontrado!');
    } else {
        // Faz uma requisição para obter os repositórios do usuário
        const response = await fetch(user.repos_url);
        const repos: GithubRepoResponse[] = await response.json(); // Converte a resposta em JSON

        // Monta a mensagem com as informações do usuário
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`;

        // Adiciona informações de cada repositório à mensagem
        repos.forEach(repo => {
            message += `\nNome: ${repo.name}` +
                `\nDescrição: ${repo.description}` +
                `\nEstrelas: ${repo.stargazers_count}` +
                `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`;
        });

        // Mostra a mensagem com todas as informações em um alerta
        alert(message);
    } 
}

// Função para mostrar todos os usuários
function showAllUsers() {
    let message = 'Usuários:\n';

    // Adiciona cada usuário ao texto da mensagem
    users.forEach(user => {
        message += `\n- ${user.login}`;
    });

    // Mostra a lista de usuários em um alerta
    alert(message);
}

// Função para mostrar o total de repositórios públicos
function showReposTotal() {
    // Calcula o total de repositórios públicos de todos os usuários
    const reposTotal = users.reduce((accumulator, user) => (accumulator + user.public_repos), 0);

    // Mostra o total em um alerta
    alert(`O grupo possui um total de ${reposTotal} repositórios públicos!`);
}

// Função para mostrar os cinco usuários com mais repositórios
function showTopFive() {
    // Ordena os usuários por número de repositórios e pega os cinco primeiros
    const topFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);

    let message = 'Top 5 usuários com mais repositórios públicos:\n';

    // Adiciona cada um dos cinco usuários à mensagem
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`;
    });

    // Mostra a lista em um alerta
    alert(message);
}

// Função principal que executa as operações
async function main() {
    // Busca vários usuários
    await fetchUser('isaacpontes');
    await fetchUser('julianaconde');
    await fetchUser('pcaldass');
    await fetchUser('lucasqueirogaa');
    await fetchUser('frans203');
    await fetchUser('LeDragoX');

    // Mostra detalhes de alguns usuários
    await showUser('isaacpontes');
    await showUser('julianaconde');

    // Mostra todos os usuários, total de repositórios e os cinco principais
    showAllUsers();
    showReposTotal();
    showTopFive();
}

// Chama a função principal para iniciar o programa
main();
