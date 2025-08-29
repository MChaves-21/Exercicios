function register(ev) {
      // 1. Essa função é chamada quando o botão "Registrar" é clicado.
  // 2. O parâmetro 'ev' contém informações sobre o evento (clique).
    console.log(ev)
    // 3. Encontra o elemento pai do botão clicado (provavelmente uma seção).
    // 4. Obtém os valores dos campos de entrada (username, password e passwordConfirmation)
  //    dentro da seção.
    const sectionElement = ev.currentTarget.parentNode
    const username = sectionElement.children.username.value
    const password = sectionElement.children.password.value
    const passwordConfirmation = sectionElement.children.passwordConfirmation.value
  
    if (password === passwordConfirmation) {
      alert("Usuário " + username + " registrado!")
    } else {
      alert("As senhas não conferem")
    }
  }
  
  function removeEvent() {
    button.removeEventListener("click", register)//remove o evento 'click'  que tem a função resgister associada a ele
    alert("Event Removed")
  }
  // 9. Seleciona o botão com o ID "register-button".
  const button = document.getElementById("register-button")
  // 10. Adiciona um ouvinte de evento para o clique no botão.
//     Quando o botão é clicado, a função 'register' é chamada.
  button.addEventListener("click", register)
  // 11. Adiciona um ouvinte de evento para o evento 'mouseover' no botão.
//     Quando o mouse passa sobre o botão, o evento é registrado no console.
  button.addEventListener("mouseover", function (ev) {
    console.log(ev)
  })