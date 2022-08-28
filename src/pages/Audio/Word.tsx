import styles from './Word.module.css'
import AudioImg from './assets/audio.png'

export const Word = ({id, word, wordTranslate, func}) => {
  return(
    <div className={styles.word} key={id}>
      <img src={AudioImg} alt="Audio Image" className={styles.audio__overall} onClick={func}/>
      <span key={id}>{`${word}`} - {wordTranslate}</span>
      </div>
  )
}
