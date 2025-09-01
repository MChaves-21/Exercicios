import { useState } from "react"
import "./App.css"

export default function App() {
  let [email, setEmail] = useState("")
  let [comentario, setComentario] = useState("")
  let [listaComentarios, setListaComentarios] = useState([])

  function ADEnvio(ev) {
    ev.preventDefault()
    if (!email || !comentario) return
    setListaComentarios([
      ...listaComentarios,
      { email, comentario, id: Date.now() },
    ])
    setEmail("")
    setComentario("")
  }

  function excluir(id) {
    const novaLista = listaComentarios.filter((item) => item.id !== id)
    setListaComentarios(novaLista)
  }

  return (
    <div>
      <h1>Seção de Comentários</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="comentario">Comentário</label>
      <textarea
        id="comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        rows="3"
      />

      <button onClick={ADEnvio}>Adicionar comentário</button>

      <div>
        {listaComentarios.map((item) => (
          <div key={item.id} className="comentario">
            <p><strong>{item.email}</strong></p>
            <p>{item.comentario}</p>
            <button className="excluir" onClick={() => excluir(item.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
