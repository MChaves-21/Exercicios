import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("GERAR");
  const [copia, setCopia] = useState("Copiar");

  function generatePassword(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    setText(newPassword);
    setCopia("Copiar");
    return newPassword;
  }

  async function copyToClipboard() {
    if (text && text !== "GERAR") {
      try {
        await navigator.clipboard.writeText(text);
        setCopia("Copiado! ✅"); // muda o botão
      } catch (err) {
        console.error("Erro ao copiar:", err);
      }
    }
  }

  return (
    <>
      <div className="card">
        <button onClick={() => generatePassword(10)}>Gerar Senha</button>
        <button onClick={copyToClipboard}>{copia}</button>
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
