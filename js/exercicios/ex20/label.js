import { Component } from "./component.js";

export class Label extends Component {
  constructor(text, parent, options) {
    super('label', parent, Object.assign({},options, { textContent: text }))
  }  // O objeto de opções é criado mesclando 'options' com um novo objeto que contém 'textContent'
}
//object assign copia propiedades