import styles from './Audio.module.css'
import AudioImg from './assets/audio.png'
import { ERoutes } from '../../utils/constants';
import { Link } from 'react-router-dom';

async function getWords() {
  
  const rawResponse = await fetch('https://rs-lang-final.herokuapp.com/words?page=1&group=0', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return await rawResponse.json();
}

// const words = await getWords();
// console.log(words);

export const Audio = () => {

  return (
    <div className={styles.audio}>
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <span>Mute</span>
          <span>Fullscreen</span>
          <Link to={`${ERoutes.games}`}>
            <span>Exit</span>
          </Link>
        </div>

        <div className={styles.main}>
          <div className='audio-img'>
            <img src={AudioImg} alt="" />
          </div>
          
          <div className={styles.words}>
            {/* {
            words.forEach(wordObj => {
              console.log(
                wordObj.word, wordObj.wordTranslate
              )
            })} */}
            <button onClick={(e) => console.log(e.target)}>1. </button>
            <button onClick={(e) => console.log(e.target)}>2 </button>
            <button onClick={(e) => console.log(e.target)}>3 </button>
            <button onClick={(e) => console.log(e.target)}>4 </button>
            <button onClick={(e) => console.log(e.target)}>5 </button>
          </div>
          
          <button id={styles.result}>Не знаю</button>
        </div>

      </div>
    </div>
  ) 
  
};
