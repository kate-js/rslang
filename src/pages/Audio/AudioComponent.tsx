import styles from './AudioComponent.module.css'
import AudioImg from './assets/audio.png'
import { ERoutes } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const baseLink = 'http://localhost:1488/';

type wordObj = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string
}

interface IState {
  isLoaded: boolean,
  words: wordObj[];
}

// function openFullscreen(elem) {
//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   }
// }

// function closeFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   }
// }

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateWords = (words: wordObj[]) => {
  for (let i = 0 ; (i < 5) && (i < words.length) ; i++) {
    const r = getRandomIntInclusive(0, 19);
    const word = words[r];
    words[r] = words[i];
    words[i] = word;
  }

  return words.slice(0, 5);
}

export const AudioComponent = () => {
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<wordObj>({});
  const [audio, setAudio] = useState(new Audio);
  const [newWords, setNewWords] = useState<wordObj[]>([]);
  const [appState, setAppState] = useState<IState>({
    isLoaded: false,
    words: [],
  });

  const getWordsList = () => {
    fetch(`${baseLink}words?page=${getRandomIntInclusive(0, 29)}&group=${getRandomIntInclusive(0, 5)}`)
    .then((res) => res.json())
    .then(
      (words) => {
        // получаем слова
        setAppState({ isLoaded: true, words });
        
        // наши 5 слов
        const newArr = generateWords(words);
        setNewWords(newArr);

        // одно выбранное слово
        const myAnswer = newArr[getRandomIntInclusive(0, 4)];
        console.log(myAnswer)

        setAnswer(myAnswer);
        setAudio(new Audio(`${baseLink}${myAnswer.audio}`))
      },
      (error) => {
        setAppState({ isLoaded: false, words: [] });
      }
    )
  }

  useEffect(() => {
    getWordsList();
  }, []);

  const checkForAnswer = ({target}) => {
    if (target.value === answer.id) {
      console.log('correct')
    } else {
      console.log('incorrect')
    }
  }

  const togglePlay = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing] );
    
  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  // useEffect(() => {
  //   window.addEventListener('keyup', handleKeyUp);
    
  //   return () => {
  //     window.removeEventListener('ended', handleKeyUp);
  //   };
  // }, [handleKeyUp]);


  if (!appState.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className={styles.audio}>
        <div className={styles.wrapper}>
          <div className={styles.controls}>
            <span>Mute</span>
            <span>Fullscreen
            </span>
            
            <Link to={`${ERoutes.games}`}>
              <span>Exit</span>
            </Link>
          </div>

          <div className={styles.main}>
            <div className='audio-img' onClick={togglePlay}>
              <img src={AudioImg} alt="" />
            </div>
            <div className={styles.words}>
              {newWords && newWords.map(({wordTranslate, id}, index) => {
                return (
                <button 
                  value={id}
                  onClick={(e) => checkForAnswer(e)} 
                  key={id}>
                    {index + 1}. {wordTranslate}
                </button>)
              })}
            </div>
            
            <button id={styles.result} onClick={getWordsList}>Не знаю</button>
          </div>

        </div>
      </div>
    ) 
  }
};
