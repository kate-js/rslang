import styles from './AudioComponent.module.css'
import { getRandomIntInclusive, shuffleArray } from '../../utils/utils';
import audioImg from './assets/audio.png'
import { ERoutes, IComponentState, IState, IVolumeSettings, IWord, keys } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import correct from './assets/sounds/correct.mp3'
import wrong from './assets/sounds/incorrect.mp3'
import muteImg from './assets/volume-mute.png'
import unmuteImg from './assets/volume.png'
import { Word } from './Word';
import exit from './assets/close.png'
import fullscreen from './assets/fullscreen.svg'
import { EApiParametrs } from '../../utils/Api';
// import { api } from '../../utils/Api';
import { Loader } from '../../components/UI/Loader/Loader';
import { TState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { apiUsersWords }  from '../../api/apiUsersWords'
import { IUserWord } from '../../api/apiConstants'
import { LEVELS } from '../../data/Data';

// TODO:
// 1. Create keyboard support

let currentPage = 0;

export const AudioComponent = () => {
  const [componentState, setComponentState] = useState<IComponentState>({
    answerCount: 0,
    volumeSettings: {
      volume: 0.3,
      isMuted: false,
    },
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
    possibleAnswers: [],
    answers: [],
    audio: new Audio,
    wordsToShow: [],
    appState: {
      isLoaded: false,
      words: [],
    },
    isAnswered: false,
    isWelcomeScreen: true,
  });
  const [userWords, setUserWords] = useState<IUserWord[]>();
  // const [streak, setStreak] = useState(0);
  const [correctAnswers, setcorrectAnswers] = useState<IWord[]>([]);
  const [wrongAnswers, setwrongAnswers] = useState<IWord[]>([]);
  const [counter, setcounter] = useState(0);

  const [playCorrect] = useSound(correct, {
    volume: componentState.volumeSettings?.volume
  });
  const [playIncorrect] = useSound(wrong, {
    volume: componentState.volumeSettings?.volume
  });

  const isFromTutorial = useSelector((state: TState) => state.level.isFromTutorial);
  const fromTutorialNumberPage = useSelector((state: TState) => state.level.numberPage);

  const isLogined = useSelector((state: TState) => state.auth.isLogined);
  const token: string = useSelector((state: TState) => state.auth.currentUser.token);
  const userId: string = useSelector((state: TState) => state.auth.currentUser.userId);
  const groupLevel = useSelector((state: TState) => state.level.level) as keyof typeof LEVELS;
  
  console.log({
    logined: isLogined, 
    tutorial: isFromTutorial, 
    page: fromTutorialNumberPage, 
    level: groupLevel
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

  const getWords = async (page: number) => {
    const res = await fetch(`${EApiParametrs.baseUrl}/words?page=${page}&group=${LEVELS[groupLevel]}`)

    return await res.json();
  }

  const getWordCurrentData = async (userId: string, wordId: string) => {
    try {
      const wordData = await apiUsersWords.getUserWordById(userId, wordId);

      // wordCurrentData = wordData;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === '404') {
          console.log('Слово ранее не использовалось');
          // wordCurrentData = initialUserWordData;
        }
      }
    }
  };

  // работает
  useEffect(() => {
    if (!isFromTutorial) {
      // Это срабатывает по стандарту если убрать !
      currentPage = fromTutorialNumberPage
    } else {
      currentPage = getRandomIntInclusive(0, 29);
    }
    console.log(currentPage);

    setGameWords();
  }, [isLogined]);

  useEffect(() => {
    // if(isLogined)
  })

  const setGameWords = async () => {
    const words = await getWords(currentPage); 
    let userWords = [];
    if (isLogined) {
      userWords = await apiUsersWords.getsAllUserWords(userId)
      setUserWords(userWords);
    }

    // если из туторила то надо фильтр сделать по изученным на наличие userWords
    // и если их мало запросить ещё, но не включая страницу текущую
    // const randomPage = getRandomIntInclusive(0, 29);
    // if (currentPage === 0) {}
    // const additionalWords = await getWords(randomPage === currentPage ? ); 
   
    // if (isFromTutorial) {
    //   const unique = words.filter(({id}) => userWords.includes({
    //     wordId: id
    //   }));
    //   console.log(unique);
    //   // Это срабатывает по стандарту если убрать !
    // } 

    console.log({
      words,
      userWords,
    });
    
    const newState = {
      appState:  { isLoaded: true, words },
      possibleAnswers : words,
    }

    updateStateByKeys(newState);
  }

  const handleWords = async () => {
    // copy array
    let possibleAnswers: IWord[] = componentState.possibleAnswers?.slice() || [];
    
    const answer = possibleAnswers[getRandomIntInclusive(0, possibleAnswers.length - 1)];
    possibleAnswers = possibleAnswers.filter((word) => word !== answer);
    const wordsWithoutAnswer = componentState.appState?.words.filter(word => word !== answer);
    
    const wordsToCreateArray = shuffleArray(wordsWithoutAnswer || []).slice(0, 4);
    wordsToCreateArray.splice(getRandomIntInclusive(0, 4), 0, answer);

    const newState = {
      possibleAnswers,
      isAnswered: false,
      wordsToShow: wordsToCreateArray,
      answer,
      audio: new Audio(`${EApiParametrs.baseUrl}/${answer.audio}`)
    }

    updateStateByKeys(newState);
  }

  useEffect(() => {
    if (!componentState.isWelcomeScreen) {
      handleWords();
    }
  }, [componentState.isWelcomeScreen]);

  useEffect(() => {
    if (!componentState.isWelcomeScreen && componentState.audio) {
      componentState.audio.play();
    }
  }, [componentState.isWelcomeScreen, componentState.audio]);

  // useEffect(() => {
  //   window.addEventListener("keydown", onKeyUpHandler);

  //   return () => {
  //     window.removeEventListener("keydown", onKeyUpHandler);
  //   }
  // }, []);

  // const onKeyUpHandler = ({key}) => {
  //   console.log(key);
  // }

  const checkGuess = ({target}: React.MouseEvent<HTMLButtonElement>) => {
    const data_id = (target as HTMLButtonElement).getAttribute('data-id');
    const rule = data_id === (componentState.answer && componentState.answer.id);

    (target as HTMLButtonElement).classList.add(rule ? styles.correct : styles.wrong);

    componentState.answer && (componentState.answer['correct'] = rule ? true : false);
    
    // не готово
    if (isLogined) {
      // getWordCurrentData(, componentState.answer?.id)
      // отправлять статистику
      // sendWordCurrentData(currentUser.userId, wordCurrent.id, isCorrectAnswer);
      console.log(`${componentState.answer} в статистику`);
    }

    if (rule) {
      playCorrect();
      setcorrectAnswers([...correctAnswers, componentState.answer])
    } else {
      playIncorrect();
      setwrongAnswers([...wrongAnswers, componentState.answer])
    }
    

    const state = {
      isAnswered: true,
      answerCount:  (componentState.answerCount || 0) + 1
    }
    // setcounter(counter => counter + 1)

    updateStateByKeys(state);
  }

  const togglePlay = () => {
    componentState.audio?.play();
  };

  const tooglePlayStatistics = (audio: string) => {
    new Audio(`${EApiParametrs.baseUrl}/${audio}`).play();
  }

  const showAnswer = () => {
    return (
      <>
        <img
          src={`${EApiParametrs.baseUrl}/${componentState.answer?.image}`}
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
          className={styles.audio__img}
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
        <div className={styles.incorrectAnswers}>
          {correctAnswers.map(({wordTranslate, word, id, audio}) => {
            return (
              <Word 
                key={id}
                wordTranslate={wordTranslate} 
                word={word} 
                id={id}
                playSound={() => tooglePlayStatistics(audio)}
              />
            )
          })}
        </div>
        <a href='/games'>
          <button 
            // onClick={resetGame}
          >
            Try again
          </button>
        </a>
        
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
            {componentState.wordsToShow && componentState.wordsToShow.map(({ wordTranslate, id }, index) => {
              return (
                <button
                  disabled={componentState.isAnswered}
                  data-id={id}
                  id={`${index + 1}`}
                  onClick={(e) => checkGuess(e)}
                  key={id + index}>
                  {index + 1}. {wordTranslate}
                </button>)
            })}
          </div>

          <button 
            id={styles.result} 
            onClick={() => {
              // если не отвечено
              setcounter(counter => counter + 1)
              
              handleWords()}
              }>
              {componentState.isAnswered ? '⟶' : 'Не знаю'}
          </button>

        </div>
      </div>
    )
  }

  if (componentState.isWelcomeScreen) {
    return (
      <button
      onClick={() => updateStateByKey('isWelcomeScreen', false)}
      >Start Game</button>
    )
  }

  if (componentState.appState?.isLoaded) {
      return (
        <div className={styles.audio}>
          {counter === 5 ? showStatistics() : showBody()}
        </div>
      ) 
    } else {
      return <Loader/>;
    }
  };
