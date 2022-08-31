import styles from './Word.module.css'
import AudioImg from './assets/audio.png'

export const Word = ({id, word, wordTranslate, playSound}) => {
  return(
    <div className={styles.word} key={id}>
      <img 
        src={AudioImg} 
        alt="Audio Image" 
        className={styles.audio__overall} 
        onClick={playSound}
      />
      <span key={id}>{`${word}`} - {wordTranslate}</span>
    </div>
  )
}
