const form = document.getElementById("orderForm")// Seleciona o formulário com o ID "orderForm" e armazena-o na variável "form".

form.addEventListener("submit", function (ev) { // Adiciona um ouvinte de eventos de "submit" ao formulário. Quando o formulário é enviado, a função fornecida é executada.
  ev.preventDefault()//evita o comportamento padrão de envio do formulario,evitando que a pagina seja recarregada 

  const name = document.querySelector("input[name='name']").value
  const address = document.querySelector("input[name='address']").value
  const breadType = document.querySelector("select[name='breadType']").value
  const main = document.querySelector("input[name='main']").value
  const observations = document.querySelector("textarea[name='observations']").value

  let salad = ""//inicializa uma variavel vazia para armazenar os elementos da salada
  document.querySelectorAll("input[name='salad']:checked").forEach(function (item) { // Seleciona todos os elementos de entrada com o nome "salad" que estão marcados (verificados) e itera sobre eles.
    salad += " - " + item.value + "\n"//a cada iteraçao vai adicionando os elementos
  })

  console.log({
    name,
    address,
    breadType,
    main,
    salad,
    observations
  })

  alert(
    "Pedido Realizado!" +
    "\nNome do cliente: " + name +
    "\nEndereço de entrega: " + address +
    "\nTipo de pão: " + breadType +
    "\nRecheio: \n - " + main + "\n" + salad +
    "Observações: " + observations
  )
})