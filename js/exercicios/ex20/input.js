import { Component } from "./component.js";
// Define a classe Input que estende a classe Component
export class Input extends Component {
  constructor(parent, options) {
      // Chama o construtor da classe pai (Component)
    // Passa 'input' como a tag do elemento, 'parent' e 'options' para o Component
    super('input', parent, options)
  }
}