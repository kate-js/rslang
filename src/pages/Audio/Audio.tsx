import styles from './Audio.module.css'
import AudioImg from './assets/audio.png'
import { ERoutes } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const baseLink = 'http://localhost:1488/words';

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
  loading: boolean,
  words: wordObj[];
}

export const AudioComp = () => {

  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState({});
  const [appState, setAppState] = useState<IState>({
    loading: false,
    words: [],
  });

  useEffect(() => {
    setAppState({ loading: true, words: [] });
    fetch(`${baseLink}?page=${0}&group=${0}`)
      .then((res) => res.json())
      .then((words) => {
        // console.log(words);
        // setAppState({ loading: false, words });

        const newArr = generateWords(words);
        // console.log(newArr);
        setAppState({ loading: false, words: newArr });
        setAnswer(newArr[getRandomIntInclusive(0, 4)])
      })
  }, []);

  const generateWords = (words: wordObj[]) => {
    for (let i = 0 ; (i < 5) && (i < words.length) ; i++) {
      const r = getRandomIntInclusive(0, 19);
      const word = words[r];
      words[r] = words[i];
      words[i] = word;
    }

    return words.slice(0, 5);
  }

  // const file = 'files/01_0002.mp3'
  // const audioLink = `http://localhost:1488/${file}`;

  // function createNewAudio(url: string) {
  //   return new Audio(url);
  // }

  // const [audio, setAudio] = useState(createNewAudio(audioLink));

  // const togglePlay = () => setPlaying(!playing);
  // const changeAudio = () => setAudio(createNewAudio(audioLink))

  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  // }, [playing] );
    
  // useEffect(() => {
  //   audio.addEventListener('ended', () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


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
            {appState.words && appState.words.map(({wordTranslate}, index) => {
              return <button key={index}>{index + 1}. {wordTranslate}</button>
            })}
          </div>
          
          <button id={styles.result}>Не знаю</button>
          <button>Change Audio</button>
        </div>

      </div>
    </div>
  ) 
  
};
