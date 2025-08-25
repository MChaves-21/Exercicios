import posterImg from "../../assets/images.jpeg"
import styles from "./styles.module.css"

export default function Card() {
  return (
    <div className={styles.container}>
      <img className={styles.poster} src={posterImg} alt="Superman" />
      <div>
        <h2 className={styles.title}>Pôster do filme Superman</h2>
        <p className={styles.description}>Um pôster decorativo épico do Superman    !</p>
        <button className={styles.button}>Comprar agora</button>
      </div>
    </div>
  )
}