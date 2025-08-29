function addPlayer() {
    const position = document.getElementById("position").value
    const name = document.getElementById("name").value
    const number = document.getElementById("number").value
  //obteve os respctivos valores dos inputs
    const confirmation = confirm("Escalar " + name + " como " + position + "?")
  //fazendo a confirmaçao
    if (confirmation) {
      const teamList = document.getElementById("team-list")//alocou a parte teamlist do html na variavel teamList
      const playerItem = document.createElement("li")//criou uma li
      playerItem.id = "player-" + number//auterou o id da li para 'player'+number(que ele recebeu no input)
      playerItem.innerText = position + ": " + name + " (" + number + ")"//adicionou texto a li que foi criada
      teamList.appendChild(playerItem)//adicionou a li criada a ul do html
  
      document.getElementById("position").value = ""
      document.getElementById("name").value = ""
      document.getElementById("number").value = ""
        //resetou os valores
    }
  }
  function removePlayer() {
    const number = document.getElementById("numberToRemove").value//recebeu o numero de remoção do input
    const playerToRemove = document.getElementById("player-" + number)//selecionou aquele que deve ser removido
  
    const confirmation = confirm("Remover o jogador " + playerToRemove.innerText + "?")
  //fez uma confimação
    if (confirmation) {
      playerToRemove.remove()
      //removeu o elemento desejado
      document.getElementById("numberToRemove").value = ""
      //resetou os valores
    }
  }