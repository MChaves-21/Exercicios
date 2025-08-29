// Define a classe Component
export class Component {
  // Declara uma propriedade privada para armazenar o elemento
  #element = null
  constructor(tag, parent, options) {
    this.tag = tag       // Armazena a tag do elemento (ex: 'div', 'span')
    this.parent = parent // Armazena o elemento pai onde o novo elemento será inserido
    this.options = options // Armazena opções adicionais para o elemento
    this.build()        // Chama o método build para criar o elemento
  }
  // Método para obter o elemento criado
  getElement() {
    return this.#element // Retorna o elemento privado
  }

  // Método que cria o elemento HTML
  build() {
    // Cria o elemento HTML usando a tag especificada
    this.#element = document.createElement(this.tag)
    // Atribui as opções ao elemento, como atributos e propriedades
    Object.assign(this.#element, this.options)
    return this // Retorna a instância atual da classe
  }

  // Método para renderizar o elemento no DOM
  render() {
    // Verifica se o pai é uma instância da classe Component,ou seja, se parent foi criado usando new Component(...)
    if (this.parent instanceof Component) {
      // Se for, adiciona o elemento criado ao elemento pai
      this.parent.getElement().append(this.#element)
    } else {
      // Caso contrário, assume que o pai é um seletor de CSS e busca o elemento no DOM
      document.querySelector(this.parent).append(this.#element)
    }
  }
}
