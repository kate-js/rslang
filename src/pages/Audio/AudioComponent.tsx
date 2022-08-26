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

const baseLinkLocal = 'http://localhost:1488/';
const baseLink = 'https://rs-lang-final.herokuapp.com/';

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
  correct?: boolean,
}

interface IState {
  isLoaded: boolean,
  words: IWord[];
}

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

interface IVolumeSettings {
  volume: number,
  isMuted: boolean,
}

interface IComponentState {
  answerCount?: number,
  volumeSettings?: IVolumeSettings,
  playing?: boolean,
  answer?: IWord,
  audio?: HTMLAudioElement,
  newWords?: IWord[],
  appState?: IState,
  isAnswered?: boolean
}

type keys = 'appState' | 'isAnswered' | 'newWords' | 'answer' | 'audio' | "answerCount" | "volumeSettings";

const defaultState = {
  answerCount: 0,
  volumeSettings: {
    volume: 0.3,
    isMuted: false,
  },
  playing: false,
  answer: {
    id: '',
    group: 0,
    page: 0,
    word: '',
    image: '',
    audio: '',
    audioMeaning: '',
    audioExample: '',
    textMeaning: '',
    textExample: '',
    transcription: '',
    textExampleTranslate: '',
    textMeaningTranslate: '',
    wordTranslate: '',
    correct: false,
  },
  audio: new Audio,
  newWords: [],
  appState: {
    isLoaded: false,
    words: [],
  },
  isAnswered: false
}

export const AudioComponent = () => {
  const [componentState, setComponentState] = useState<IComponentState>({
    answerCount: 0,
    volumeSettings: {
      volume: 0.3,
      isMuted: false,
    },
    playing: false,
    answer: {
      id: '',
      group: 0,
      page: 0,
      word: '',
      image: '',
      audio: '',
      audioMeaning: '',
      audioExample: '',
      textMeaning: '',
      textExample: '',
      transcription: '',
      textExampleTranslate: '',
      textMeaningTranslate: '',
      wordTranslate: '',
      correct: false,
    },
    audio: new Audio,
    newWords: [],
    appState: {
      isLoaded: false,
      words: [],
    },
    isAnswered: false
  });


  function updateStateByKey(key: keys, value: number | boolean | IWord | IWord[] | HTMLAudioElement | IVolumeSettings | IState) {
    setComponentState(
      {...componentState,
        [key]: value
      })
  }

  function updateStateByKeys(newState: IComponentState) {
    setComponentState(
      {...componentState,
        ...newState
      })

  }

  const [playCorrect] = useSound(CorrectSound, {
    volume: componentState.volumeSettings?.volume
  });

  const [playIncorrect] = useSound(IncorrectSound, {
    volume: componentState.volumeSettings?.volume
  });

  const getWords = async () => {
    const res = await fetch(`${baseLink}words?page=${getRandomIntInclusive(0,29)}&group=${getRandomIntInclusive(0, 5)}`)

    return await res.json();
  }

  useEffect(() => {
    const recieveData = async () => {
      const words = await getWords();
      const newArr = shuffleArray(words).slice(0, 5);
      const myAnswer = newArr[getRandomIntInclusive(0, 4)];

      const newState = {
        appState:  { isLoaded: true, words },
        isAnswered: false,
        newWords: newArr,
        answer: myAnswer,
        audio: new Audio(`${baseLink}${myAnswer.audio}`)
      }

      updateStateByKeys(newState);
    }

    recieveData();
  }, []);

  const checkForAnswer = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    const rule = (target as HTMLButtonElement).value === (componentState.answer && componentState.answer.id);

    if (rule) {
      playCorrect();
      (target as HTMLButtonElement).classList.add(styles.correct);
      componentState.answer && (componentState.answer['correct'] = true);
    } else {
      playIncorrect();
      (target as HTMLButtonElement).classList.add(styles.incorrect)
      componentState.answer && (componentState.answer['correct'] = false);
    }

    const state = {
      isAnswered: true,
      answerCount:  componentState.answerCount || 0 + 1
    }

    updateStateByKeys(state);
  }

  const togglePlay = () => {
    // setPlaying(!playing)
    componentState.audio?.play();
  };

  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  //   return () => audio.pause();
  // }, [playing] );

  // useEffect(() => {
  //   audio.addEventListener('ended', () => {
  //     console.log('end')
  //     setPlaying(false)
  //   });
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

  const showAnswerContent = () => {
    return (
      <>
        <img
          src={`${baseLink}${componentState.answer && componentState.answer.image}`}
          className={styles.answer}
          alt="Answer Image"
          onClick={togglePlay}
        />
        <div className={styles.answer__translate}>
          <span className={styles.answer__eng}>
            {componentState.answer && componentState.answer.word}
          </span>
          <span className={styles.answer__ru}>
            {componentState.answer && componentState.answer.wordTranslate}
          </span>
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

  const renderStatistics = () => {
    return (
      <div>There should be a modal window</div>
    )
  }

  const renderBody = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <img
            className={styles.volume}
            src={componentState.volumeSettings?.isMuted ? MuteImg : UnmuteImg}
            alt="Volume Button"
            onClick={() => {
              updateStateByKey("volumeSettings", {
                volume: componentState.volumeSettings?.isMuted ? 0.3 : 0,
                isMuted: componentState.volumeSettings?.isMuted ? false : true
              })
            }}
          />
          <span onClick={(e) => console.log(e.target)}>
            Fullscreen
          </span>

          <Link to={`${ERoutes.games}`}>
            <span>Exit</span>
          </Link>
        </div>

        <div className={styles.main}>
          <span>{componentState.answerCount} / 20</span>

          <div className={styles.answer__wrapper}>
            {componentState.isAnswered ? showAnswerContent() : showAudio()}
          </div>

          <div className={styles.words}>
            {componentState.newWords && componentState.newWords.map(({ wordTranslate, id }, index) => {
              return (
                <button
                  disabled={componentState.isAnswered}
                  value={id}
                  onClick={(e) => checkForAnswer(e)}
                  key={id}>
                  {index + 1}. {wordTranslate}
                </button>)
            })}
          </div>

          <button id={styles.result} onClick={getWords}>{componentState.isAnswered ? '⟶' : 'Не знаю'}
          </button>

        </div>
      </div>
    )
  }

// if (componentState.appState.isLoaded) {
  //   return (
  //     <div className={styles.audio}>
  //       {componentState.answerCount === 10 ? renderStatistics() : renderBody()}
  //     </div>
  //   ) 
  // } else {
  //   return <div>Загрузка...</div>;
  // }

  return (
    <div className={styles.audio}>
      {componentState.answerCount === 10 ? renderStatistics() : renderBody()}
    </div>
  )
};

// const handleKey = (e) => {
  //   console.log(e.key);
  // }
  // useEffect(() => {
  //   window.addEventListener('keyup', handleKey);
  //   return () => {
  //     window.removeEventListener('ended', handleKey);
  //   };
  // }, );

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
