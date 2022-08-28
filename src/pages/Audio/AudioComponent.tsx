import styles from './AudioComponent.module.css'
import { getRandomIntInclusive, shuffleArray } from '../../utils/utils';
import audioImg from './assets/audio.png'
import { ERoutes, IComponentState, IState, IVolumeSettings, IWord, keys } from '../../utils/constants';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import correct from './assets/sounds/correct.mp3'
import wrong from './assets/sounds/incorrect.mp3'
import muteImg from './assets/volume-mute.png'
import unmuteImg from './assets/volume.png'
import { Word } from './Word';
import exit from './assets/close.png'
import fullscreen from './assets/fullscreen.svg'


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
    correctAnswers: [],
    incorrectAnswers: [],
    audio: new Audio,
    newWords: [],
    appState: {
      isLoaded: false,
      words: [],
    },
    isAnswered: false
  });

  const [playCorrect] = useSound(correct, {
    volume: componentState.volumeSettings?.volume
  });

  const [playIncorrect] = useSound(wrong, {
    volume: componentState.volumeSettings?.volume
  });

  function updateStateByKey(key: keys, value: number | boolean | IWord | IWord[] | HTMLAudioElement | IVolumeSettings | IState) {
    setComponentState(
      { 
        ...componentState,
        [key]: value
      }
    )
  }

  function updateStateByKeys(newState: IComponentState) {
    setComponentState(
      {
        ...componentState,
        ...newState
      }
    )
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
    const choosenWords = shuffleArray(words).slice(0, 5);
    const answer = choosenWords[getRandomIntInclusive(0, 4)];

    const newState = {
      appState:  { isLoaded: true, words },
      isAnswered: false,
      newWords: choosenWords,
      answer: answer,
      audio: new Audio(`${baseLink}${answer.audio}`)
    }

    updateStateByKeys(newState);
  }

  useEffect(() => {
    handleData();
  }, []);

  const checkGuess = ({target}: React.MouseEvent<HTMLButtonElement>) => {
    const data_id = (target as HTMLButtonElement).getAttribute('data-id');
    const rule = data_id === (componentState.answer && componentState.answer.id);

    (target as HTMLButtonElement).classList.add(rule ? styles.correct : styles.wrong);

    componentState.answer && (componentState.answer['correct'] = rule ? true : false);

    if (rule) {
      playCorrect();
      componentState.correctAnswers?.push(componentState.answer)
    } else {
      componentState.incorrectAnswers?.push(componentState.answer)
      playIncorrect();
    }

    const state = {
      isAnswered: true,
      answerCount:  (componentState.answerCount || 0) + 1
    }

    updateStateByKeys(state);
  }

  const togglePlay = () => {
    componentState.audio?.play();
  };

  const tooglePlayStatistics = (audio: string) => {
    const sound = new Audio(`${baseLink}${audio}`);
    sound.play();
  }

  const showAnswer = () => {
    return (
      <>
        <img
          src={`${baseLink}${componentState.answer?.image}`}
          className={styles.answer}
          alt="Answer Image"
          onClick={ togglePlay } 
        />
        <div className={styles.answer__description}>
          <span className={styles.answer__eng}>
            { componentState.answer?.word }
          </span>
          <span className={styles.answer__ru}>
            { componentState.answer?.wordTranslate }
          </span>
        </div>
      </>
    )
  }

  const showAudioImg = () => {
    return (
      <>
        <img
          src={audioImg}
          alt="Audio Image"
          onClick={togglePlay}
        />
      </>
    )
  }

  const showStatistics = () => {
    return (
      <div className={styles.overall}>
        {/* <div className={styles.correctAnswers}>
          {componentState.correctAnswers?.map(({wordTranslate, word, id, audio}) => {
            return (
              <div className={styles.word} key={id}>
                <img src={AudioImg} alt="Audio Image" className={styles.audio__overall} onClick={() => tooglePlayStatistics(audio)}/>
                <span key={id}>{`${word}`} - {wordTranslate}</span>
              </div>
            )
          })}
        </div> */}
        <div className={styles.incorrectAnswers}>
          {componentState.incorrectAnswers?.map(({wordTranslate, word, id, audio}) => {
            return (
              <Word 
                wordTranslate={wordTranslate} 
                word={word} 
                id={id}
                func={() => tooglePlayStatistics(audio)}
              />
            )
          })}
        </div>
        
        <button onClick={resetGame}>Try again</button>
      </div>
    )
  }

  const showBody = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <div className={styles.controls__left}>
            <img
              className={styles.volume}
              src={componentState.volumeSettings?.isMuted ? muteImg : unmuteImg}
              alt="Mute Image"
              onClick={() => {
                updateStateByKey("volumeSettings", {
                  volume: componentState.volumeSettings?.isMuted ? 0.3 : 0,
                  isMuted: componentState.volumeSettings?.isMuted ? false : true
                })
              }}
            />
            <img 
              src={fullscreen} 
              alt="" 
              className={styles.fullscreen} 
              onClick={(e) => console.log(e.target)}
            />
          </div>
        
          <Link to={`${ERoutes.games}`}>
            <img src={exit} alt="Exit" className={styles.exit}/>
          </Link>
        </div>

        <div className={styles.main}>
          <span>{componentState.answerCount} / 20</span>
          <div className={styles.answer__wrapper}>
            {
              componentState.isAnswered 
              ? showAnswer() 
              : showAudioImg()
            }
          </div>

          <div className={styles.words}>
            {componentState.newWords && componentState.newWords.map(({ wordTranslate, id }, index) => {
              return (
                <button
                  disabled={componentState.isAnswered}
                  data-id={id}
                  onClick={(e) => checkGuess(e)}
                  key={id}>
                  {index + 1}. {wordTranslate}
                </button>)
            })}
          </div>

          <button 
            id={styles.result} 
            onClick={handleData}>
              {componentState.isAnswered ? '⟶' : 'Не знаю'}
          </button>

        </div>
      </div>
    )
  }

if (componentState.appState?.isLoaded) {
    return (
      <div className={styles.audio}>
        {componentState.answerCount === 20 ? showStatistics() : showBody()}
      </div>
    ) 
  } else {
    return <div>Загрузка...</div>;
  }
};
