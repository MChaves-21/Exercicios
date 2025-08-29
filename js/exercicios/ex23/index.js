function validateEmail(email) {
    if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) { // Verifica se o email corresponde ao padrão esperado
        const err = new Error('Email inválido.')
        err.input = 'email'//identifica o erro
        throw err//lança o erro
    }
}

function validatePassword(password) {
    if (
        password.length < 8 || 
        !password.match(/[a-z]/) || 
        !password.match(/[A-Z]/) || 
        !password.match(/[0-9]/) ||
        !password.match(/[^a-zA-Z0-9\s]/)//verifica se a senha segue o padrao esperado
    ) {
        const err = new Error('Senha inválida.')
        err.input = 'password'//identifica o erro
        throw err//lança o erro
    }
}

function resetFormStyles() { // Para cada entrada de usuário, remove as classes de sucesso e erro
    Object.entries(userInputs).forEach(([key, value]) => {
        value.classList.remove('success', 'error')// Remove as classes
        document.querySelector(`#${key}-error`).textContent = '' // Limpa as mensagens de erro
    })
}

const userInputs = {}//obejeto que armazena as entradas do usuario
//seleciona os elementos do formulario
userInputs.name = document.querySelector('#name')
userInputs.email = document.querySelector('#email')
userInputs.password = document.querySelector('#password')

const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    resetFormStyles()
    try {
        userInputs.name.classList.add('success')
        validateEmail(userInputs.email.value)
        userInputs.email.classList.add('success')
        validatePassword(userInputs.password.value)
        userInputs.password.classList.add('success')
    } catch (err) {
        userInputs[err.input].classList.add('error')//marca o campo que causou o erro
        document.querySelector(`#${err.input}-error`).textContent = err.message//exibe a mensagen de erro
    }
})
