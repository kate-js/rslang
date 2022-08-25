import styles from './AudioComponent.module.css'
import AudioImg from './assets/audio.png'
import { ERoutes } from '../../utils/constants';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import CorrectSound from './assets/sounds/correct.mp3'
import IncorrectSound from './assets/sounds/incorrect.mp3'
import MuteImg from './assets/volume-mute.png'
import UnmuteImg from './assets/volume.png'

const baseLink = 'http://localhost:1488/';

interface IWord {
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
  wordTranslate: string,
  correct? : boolean,
}

interface IState {
  isLoaded: boolean,
  words: IWord[];
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

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array: IWord[]): IWord[] {
  const newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const AudioComponent = () => {
  const [answerCount, setAnswerCount] = useState(0);
  const [volumeSettings, setVolume] = useState({
    volume: 0.3,
    isMuted: false,
  });
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<IWord>();
  const [audio, setAudio] = useState(new Audio);
  const [newWords, setNewWords] = useState<IWord[]>([]);
  const [appState, setAppState] = useState<IState>({
    isLoaded: false,
    words: [],
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [playCorrect] = useSound(CorrectSound, {
    volume: volumeSettings.volume
  });
  const [playIncorrect] = useSound(IncorrectSound, {
    volume: volumeSettings.volume
  });
  
  const changeVolume = () => {
    volumeSettings.isMuted 
    ? setVolume({
      volume: 0.3,
      isMuted: false
    })
    : setVolume({
      volume: 0,
      isMuted: true
    });
  }

  function setStates(words: IWord[]) {
    setAppState({ isLoaded: true, words });
    setIsAnswered(false);        
  
    // наши 5 слов
    const newArr = shuffleArray(words).slice(0, 5);
    setNewWords(newArr);
    // одно выбранное слово
    const myAnswer = newArr[getRandomIntInclusive(0, 4)];
    console.log(myAnswer)
    setAnswer(myAnswer);
    setAudio(
      new Audio(`${baseLink}${myAnswer.audio}`)
    );
  }

  const getWords = async () => {
    const res = await fetch(`${baseLink}words?page=${getRandomIntInclusive(0, 29)}&group=${getRandomIntInclusive(0, 5)}`)

    const words = await res.json();
    
    setStates(words);
  }

  useEffect(() => {
    getWords();
  }, []);

  // ClickEvent<HTMLButtonElement>
  const checkForAnswer = ({target}: React.MouseEvent<HTMLButtonElement>) => {
    setIsAnswered(true);
    setAnswerCount((answer) => answer + 1);


    if ((target as HTMLButtonElement).value === (answer && answer.id)) {
      playCorrect();
      (target as HTMLButtonElement).classList.add(styles.correct);
      answer && (answer['correct'] = true);
    } else {
      
      playIncorrect();
      (target as HTMLButtonElement).classList.add(styles.incorrect)
      answer && (answer['correct'] = false);
    }
  }

  const togglePlay = () => {
    // setPlaying(!playing)
    audio.play();
  };

  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  //   return () => audio.pause();
  // }, [playing] );
    
  useEffect(() => {
    audio.addEventListener('ended', () => {
      console.log('end')
      setPlaying(false)
    });
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  // const handleKey = (e) => {
  //   console.log(e.key);
  // }

  // useEffect(() => {
  //   window.addEventListener('keyup', handleKey);
  //   return () => {
  //     window.removeEventListener('ended', handleKey);
  //   };
  // }, );

  const showAnswerContent = () => {
    return (
      <>
        <img 
          src={`${baseLink}${answer && answer.image}`} 
          className={styles.answer} 
          alt="Answer Image" 
          onClick={togglePlay}
        />
        <div className={styles.answer__translate}>
          <span className={styles.answer__eng}>{answer && answer.word}</span>
          <span className={styles.answer__ru}>{answer && answer.wordTranslate}</span>
        </div>
      </>
    )
  }

  const showAudio = () => {
    return (
      <>
        <img 
          src={AudioImg} 
          alt="Audio Button" 
          onClick={togglePlay}
        />
      </>
    )
  }

  if (!appState.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className={styles.audio} >
        <div className={styles.wrapper}>
          <div className={styles.controls}>
            <img 
              className={styles.volume} 
              src={volumeSettings.isMuted ? MuteImg : UnmuteImg} 
              alt="Volume Button" 
              onClick={changeVolume} 
            />

            <span onClick={(e) => console.log(e.target)}>
              Fullscreen
            </span>
            
            <Link to={`${ERoutes.games}`}>
              <span>Exit</span>
            </Link>
          </div>

          <div className={styles.main}>
            <div className={styles.answer__wrapper}>
              {isAnswered ? showAnswerContent() : showAudio()}
            </div>
            <div className={styles.words}>
              {newWords && newWords.map(({wordTranslate, id}, index) => {
                return (
                <button 
                  disabled={isAnswered}
                  value={id}
                  onClick={(e) => checkForAnswer(e)} 
                  key={id}>
                    {index + 1}. {wordTranslate}
                </button>)
              })}
            </div>
            
            <button id={styles.result} onClick={getWords}>{isAnswered ? '⟶' : 'Не знаю'}</button>
          </div>

        </div>
      </div>
    ) 
  }
};
