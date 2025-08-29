export class HttpError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message); // Chama o construtor da classe pai (Error) com a mensagem do erro.
      this.status = status; // Atribui o status HTTP ao erro.
    }
  }
  //Exemplo de erro:
//throw new HttpError(404, "Not Found");
//A classe HttpError é uma maneira de criar erros HTTP personalizados em sua aplicação. Ela estende a classe nativa Error e adiciona a propriedade status, que representa o código de status HTTP do erro. Isso torna o tratamento de erros mais claro, organizado e fácil de usar em APIs.