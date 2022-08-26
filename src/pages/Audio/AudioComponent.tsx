import styles from './AudioComponent.module.css'
import AudioImg from './assets/audio.png'
import { ERoutes, IComponentState, IState, IVolumeSettings, IWord, keys } from '../../utils/constants';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import CorrectSound from './assets/sounds/correct.mp3'
import IncorrectSound from './assets/sounds/incorrect.mp3'
import muteImg from './assets/volume-mute.png'
import unmuteImg from './assets/volume.png'
import { getRandomIntInclusive, shuffleArray } from '../../utils/utils';

// const baseLinkLocal = 'http://localhost:1488/';
const baseLink = 'https://rs-lang-final.herokuapp.com/';

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
    answers: [],
    audio: new Audio,
    newWords: [],
    appState: {
      isLoaded: false,
      words: [],
    },
    isAnswered: false
  });

  const [playCorrect] = useSound(CorrectSound, {
    volume: componentState.volumeSettings?.volume
  });

  const [playIncorrect] = useSound(IncorrectSound, {
    volume: componentState.volumeSettings?.volume
  });

  function updateStateByKey(key: keys, value: number | boolean | IWord | IWord[] | HTMLAudioElement | IVolumeSettings | IState) {
    setComponentState(
      { ...componentState,
        [key]: value
      })
  }

  function updateStateByKeys(newState: IComponentState) {
    setComponentState(
      {...componentState,
        ...newState
      })
  }

  const getWords = async () => {
    const res = await fetch(`${baseLink}words?page=${getRandomIntInclusive(0,29)}&group=${getRandomIntInclusive(0, 5)}`)

    return await res.json();
  }

  const resetGame = () => {
    updateStateByKey('answerCount', 0);
    // handleData();
  }

  const handleData = async () => {
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

  useEffect(() => {
    handleData();
  }, []);

  // useEffect(() => {
  //   const onKeypress = ({key}) => console.log(key);
  
  //   document.addEventListener('keypress', onKeypress);
  
  //   return () => {
  //     document.removeEventListener('keypress', onKeypress);
  //   };
  // }, []);

  const checkForAnswer = ({target}: React.MouseEvent<HTMLButtonElement>) => {
    const data_id = (target as HTMLButtonElement).getAttribute('');
    const rule = data_id === (componentState.answer && componentState.answer.id);

    (target as HTMLButtonElement).classList.add(rule ? styles.correct : styles.incorrect);

    componentState.answer && (componentState.answer['correct'] = rule ? true : false);

    // componentState.answers.push(componentState.answer);

    // const newState = [...arr, componentState.answer]

    // updateStateByKey('answers', [...componentState.answers])


    if (rule) {
      playCorrect();
    } else {
      playIncorrect();
    }

    const state = {
      isAnswered: true,
      answerCount:  (componentState.answerCount || 0) + 1
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

  const showAnswer = () => {
    return (
      <>
        <img
          src={`${baseLink}${componentState.answer && componentState.answer.image}`}
          className={styles.answer}
          alt="Answer Image"
          onClick={togglePlay}
        />
        <div className={styles.answer__description}>
          <span className={styles.answer__eng}>
            {componentState.answer && componentState.answer?.word}
          </span>
          <span className={styles.answer__ru}>
            {componentState.answer && componentState.answer?.wordTranslate}
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
      <div>There should be a modal window
        <button onClick={resetGame}>Try again</button>
      </div>
    )
  }

  const renderBody = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <img
            className={styles.volume}
            src={componentState.volumeSettings?.isMuted ? muteImg : unmuteImg}
            alt="Mute/Unmute Image"
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
            {componentState.isAnswered ? showAnswer() : showAudio()}
          </div>

          <div className={styles.words}>
            {componentState.newWords && componentState.newWords.map(({ wordTranslate, id }, index) => {
              return (
                <button
                  disabled={componentState.isAnswered}
                  data-id={id}
                  onClick={(e) => checkForAnswer(e)}
                  onKeyDown={(e) => {
                    if (e.key === '1') {
                      console.log('Enter press');
                    }
                  }}
                  key={id}>
                  {index + 1}. {wordTranslate}
                </button>)
            })}
          </div>

          <button id={styles.result} onClick={handleData}>{componentState.isAnswered ? '⟶' : 'Не знаю'}
          </button>

        </div>
      </div>
    )
  }

if (componentState.appState?.isLoaded) {
    return (
      <div className={styles.audio}>
        {componentState.answerCount === 10 ? renderStatistics() : renderBody()}
      </div>
    ) 
  } else {
    return <div>Загрузка...</div>;
  }

};



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
