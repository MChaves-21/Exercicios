//tudo que estiver na pasta public pode ser acessado diretamente na raiz da url
export default function App() {
  return (
    <div className="app">
      <img src="/react.png" alt="Logo" />
      <h1>React</h1>
      <p>bibliotecas para interfaces de usuario web e nativas</p>
      <div>
        <button>Aprenda React</button>
        <button>Referência da API</button>
      </div>
      <h2>Crie interfaces de usuarios de componentes</h2>
      <p>React permite que você construa interfaces de usuário a partir de pedaços individuais chamados componentes.</p>
      <hr />
      <h2>Escreva componentes com código e marcação</h2>
      <p>Componentes React são funções JavaScript. A sintaxe de marcação é chamada de JSX. É uma extensão da sintaxe JavaScript popularizada pelo React.</p>
      <hr />
      <h2>Próximos passos</h2>
      <ul>
        <li>Uso de dados dinâmicos no JSX</li>
        <li>Criação de novos componentes</li>
        <li>Estilização de componentes</li>
        <li>Reutilização de componentes</li>
        <li>Uso de props e children</li>
        <li>Uso de eventos do JavaScript</li>
      </ul>
    </div>
  );
}