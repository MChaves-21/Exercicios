// Função que cria um contêiner para uma transação
function createTransactionContainer(id) {
    // Cria um novo elemento <div>
    const container = document.createElement('div');
    // Adiciona a classe 'transaction' ao contêiner
    container.classList.add('transaction');
    // Define o ID do contêiner, formatando-o como 'transaction-{id}'
    container.id = `transaction-${id}`;
    // Retorna o contêiner criado
    return container;
}

// Função que cria um título para a transação
function createTransactionTitle(name) {
    // Cria um novo elemento <span>
    const title = document.createElement('span');
    // Adiciona a classe 'transaction-title' ao título
    title.classList.add('transaction-title');
    // Define o conteúdo do título como o nome passado como parâmetro
    title.textContent = name;
    // Retorna o título criado
    return title;
}

// Função que cria um elemento <span> para exibir o valor da transação
function createTransactionAmount(amount) {
    const span = document.createElement('span');
    span.classList.add('transaction-amount'); // Adiciona a classe 'transaction-amount' ao <span>
  
    // Cria um formatador de números para o padrão brasileiro
    const formater = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long', // Define a exibição compacta como 'long'
        currency: 'BRL',       // Define a moeda como real brasileiro (BRL)
        style: 'currency',     // Define o estilo como moeda
    });
  
    // Formata o valor recebido em um formato monetário
    const formatedAmount = formater.format(amount);
  
    // Verifica se o valor é positivo ou negativo
    if (amount > 0) {
        span.textContent = `${formatedAmount} C`; // Para valores positivos, adiciona 'C' para crédito
        span.classList.add('credit'); // Adiciona a classe 'credit' ao <span>
    } else {
        span.textContent = `${formatedAmount} D`; // Para valores negativos, adiciona 'D' para débito
        span.classList.add('debit'); // Adiciona a classe 'debit' ao <span>
    }
  
    return span; // Retorna o <span> formatado
}

// Função que renderiza a transação na interface
function renderTransaction(transaction) {
    const container = createTransactionContainer(transaction.id); // Cria o contêiner da transação
    const title = createTransactionTitle(transaction.name); // Cria o título da transação
    const amount = createTransactionAmount(transaction.amount); // Cria o valor da transação
  
    // Adiciona o contêiner ao elemento com ID 'transactions'
    document.querySelector('#transactions').append(container);
    // Adiciona o título e o valor ao contêiner
    container.append(title, amount);
}

// Função para buscar transações do servidor
async function fetchTransactions() {
    return await fetch('http://localhost:3000/transactions').then(res => res.json());
}

let transactions = []; // Array para armazenar as transações

// Função para atualizar o saldo total
function updateBalance() {
    const balanceSpan = document.querySelector('#balance');
    // Calcula o saldo total somando os valores das transações
    const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    // Formata o saldo como moeda
    const formater = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long',
        currency: 'BRL',
        style: 'currency'
    });
    balanceSpan.textContent = formater.format(balance); // Atualiza o texto do saldo na interface
}

// Função de configuração inicial
async function setup() {
    const results = await fetchTransactions(); // Busca as transações
    transactions.push(...results); // Adiciona as transações ao array
    transactions.forEach(renderTransaction); // Renderiza cada transação
    updateBalance(); // Atualiza o saldo total
}

// Adiciona um evento para executar a configuração ao carregar a página
document.addEventListener('DOMContentLoaded', setup);

// Função para salvar uma nova transação
async function saveTransaction(ev) {
    ev.preventDefault(); // Previne o comportamento padrão do formulário
  
    const name = document.querySelector('#name').value; // Obtém o nome da transação
    const amount = parseFloat(document.querySelector('#amount').value); // Obtém o valor da transação
  
    const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        body: JSON.stringify({ name, amount }), // Envia o nome e o valor como JSON
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        }
    });
    const transaction = await response.json(); // Obtém a transação criada
    transactions.push(transaction); // Adiciona a nova transação ao array
    renderTransaction(transaction); // Renderiza a nova transação
  
    ev.target.reset(); // Limpa o formulário
    updateBalance(); // Atualiza o saldo total
}

// Adiciona um evento para salvar a transação ao enviar o formulário
document.querySelector('form').addEventListener('submit', saveTransaction);

// Função para criar o botão de editar transação
function createEditTransactionBtn(transaction) {
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn'); // Adiciona a classe 'edit-btn'
    editBtn.textContent = 'Editar'; // Define o texto do botão
    // Adiciona um evento de clique para preencher o formulário com os dados da transação
    editBtn.addEventListener('click', () => {
        document.querySelector('#id').value = transaction.id; // Preenche o campo ID
        document.querySelector('#name').value = transaction.name; // Preenche o campo nome
        document.querySelector('#amount').value = transaction.amount; // Preenche o campo valor
    });
    return editBtn; // Retorna o botão criado
}

// A função para salvar a transação foi redefinida para incluir a lógica de atualização
async function saveTransaction(ev) {
    ev.preventDefault(); // Previne o comportamento padrão do formulário
  
    const id = document.querySelector('#id').value; // Obtém o ID da transação
    const name = document.querySelector('#name').value; // Obtém o nome da transação
    const amount = parseFloat(document.querySelector('#amount').value); // Obtém o valor da transação
  
    if (id) {
        // Se houver um ID, atualiza a transação existente
        const response = await fetch(`http://localhost:3000/transactions/${id}`, {
            method: 'PUT', // Método PUT para atualizar
            body: JSON.stringify({ name, amount }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const transaction = await response.json(); // Obtém a transação atualizada
        const indexToRemove = transactions.findIndex((t) => t.id === id); // Encontra o índice da transação
        transactions.splice(indexToRemove, 1, transaction); // Substitui a transação no array
        document.querySelector(`#transaction-${id}`).remove(); // Remove a transação antiga da interface
        renderTransaction(transaction); // Renderiza a transação atualizada
    } else {
        // Se não houver ID, cria uma nova transação
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'POST',
            body: JSON.stringify({ name, amount }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const transaction = await response.json(); // Obtém a nova transação
        transactions.push(transaction); // Adiciona a nova transação ao array
        renderTransaction(transaction); // Renderiza a nova transação
    }
  
    ev.target.reset(); // Limpa o formulário
    updateBalance(); // Atualiza o saldo total
}

// Função para criar o botão de excluir transação
function createDeleteTransactionButton(id) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn'); // Adiciona a classe 'delete-btn'
    deleteBtn.textContent = 'Excluir'; // Define o texto do botão
    // Adiciona um evento de clique para excluir a transação
    deleteBtn.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/transactions/${id}`, { method: 'DELETE' }); // Envia uma solicitação DELETE
        deleteBtn.parentElement.remove(); // Remove o contêiner da transação da interface
        const indexToRemove = transactions.findIndex((t) => t.id === id); // Encontra o índice da transação
        transactions.splice(indexToRemove, 1); // Remove a transação do array
        updateBalance(); // Atualiza o saldo total
    });
    return deleteBtn; // Retorna o botão criado
}
