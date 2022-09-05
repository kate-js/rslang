import styles from './AudioComponent.module.css'
import { getRandomIntInclusive, shuffleArray } from '../../utils/utils';
import { ERoutes, IComponentState, IState, IVolumeSettings, IWord, KeyboardKey, keys } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Loader } from '../../components/UI/Loader/Loader';
import { TState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { apiUsersWords }  from '../../api/apiUsersWords'
import { EApiParametrs, IUserWord, initialUserWordData } from '../../api/apiConstants';
import { LEVELS } from '../../data/Data';
import { Word } from './Word';
import correct from './assets/sounds/correct.mp3'
import wrong from './assets/sounds/incorrect.mp3'
import audioImg from './assets/audio.png'
import muteImg from './assets/volume-mute.png'
import unmuteImg from './assets/volume.png'
import exit from './assets/close.png'
import fullscreen from './assets/fullscreen.svg'
import { apiAggregatedWords } from '../../api/apiUsersAggregatedWords';
import { setIsFromTutorial } from '../../store/sprintSlice';

let currentPage = 0;
let isPress = false;
let learnWordToday = 0;
const allStricks: number[] = [];
let strick = 0;

// статистика
// подгруз слов
// поменять фетч UPD. DONE
// все isFromTutorial надо проверить

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
  const [correctAnswers, setcorrectAnswers] = useState<IWord[]>([]);
  const [wrongAnswers, setwrongAnswers] = useState<IWord[]>([]);
  const [serverData, setServerData] = useState<IUserWord>();
  const dispatch = useDispatch();

  const [playCorrect] = useSound(correct, {
    volume: componentState.volumeSettings?.volume
  });
  const [playIncorrect] = useSound(wrong, {
    volume: componentState.volumeSettings?.volume
  });

  const [isModal, setIsmodal] = useState(true);

  const isFromTutorial = useSelector((state: TState) => state.level.isFromTutorial);
  const tutorialNumberPage = useSelector((state: TState) => state.level.numberPage);
  const groupLevel = useSelector((state: TState) => state.level.level) as keyof typeof LEVELS;

  const isLogined = useSelector((state: TState) => state.auth.isLogined);
  const userId: string = useSelector((state: TState) => state.auth.currentUser.userId);
  const navigate = useNavigate();

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

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [componentState.wordsToShow]);
  
  // console.log({
  //   logined: isLogined, 
  //   tutorial: isFromTutorial, 
  //   page: tutorialNumberPage, 
  //   level: groupLevel
  // });

  useEffect(() => {

    // перенести в конец
    // dispatch(setIsFromTutorial(false));
    
    // Это срабатывает по стандарту если убрать !
    if (!isFromTutorial) {
      currentPage = tutorialNumberPage
    } else {
      currentPage = getRandomIntInclusive(0, 29);
    }

    
    setGameWords();
    dispatch(setIsFromTutorial(false));


  }, [isLogined]);

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

  const getWords = async (page = currentPage, group = LEVELS[groupLevel]) => {
    const res = await fetch(`${EApiParametrs.baseUrl}/words?page=${page}&group=${group}`)

    return await res.json();
  }

  const getWordCurrentData = async (userId: string, wordId: string) => {
    try {
      const wordData = await apiUsersWords.getUserWordById(userId, wordId);
      setServerData(wordData);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === '404') {
          console.log('Слово ранее не использовалось');
          setServerData(initialUserWordData);
        }
      }
    }
  };

  const getAggregatedWords = async (page: number, group: number, isFromTutorial: boolean) => {

    const query = {
      group: ``,
      page: ``,
      wordsPerPage: 20,
      filter: `{"$or":[{"$and": [{"group": ${group}}, {"page": ${page}}
      ${isFromTutorial ? `,{"userWord.optional.learningWord":false}` : ''}]} ,{"$and": [{"group": ${group}}, {"page": ${page}}, {"userWord":null}]}]}`
    };

    const aggregatedWords = (await apiAggregatedWords.getAllAggregatedWords(
      userId,
      query
    ));

    const normalWords = aggregatedWords[0].paginatedResults.map((word) => {
      const wordObj = {...word};
      wordObj.id = word._id;
      return wordObj
    });

    return normalWords;
  }

  // useEffect(() => {
  //   const addData = async () => {
  //     if (componentState.appState?.isLoaded && componentState.appState?.words.length < 20) {
  //       const newWords = await getAggregatedWords(17 - 1, 5)
  //       const combinedArray = [...componentState.appState.words, ...newWords];

  //       const newState = {
  //         appState:  { isLoaded: true, words: combinedArray },
  //         possibleAnswers : combinedArray,
  //       }
    
  //       updateStateByKeys(newState);
  //     }
  //   }

  // }, [])

  const setGameWords = async () => {
    
    // make fetch request using page and level
    let words = []; 
    let userWords: IUserWord[] = [];
    
    // userWords = await getAggregatedWords(LEVELS[groupLevel], currentPage);
    if (isFromTutorial && isLogined) {
        userWords = await getAggregatedWords(10, 5, true);
        words = userWords;
    } else if (isLogined) {
        userWords = await getAggregatedWords(17, 5, false);
        words = userWords;
    } else {
      words = await getWords(11, 5); 
    }

    // если недостаточно слов, то дозапрашиваем слова
    // if (words.length < 20) {
    //   console.log('недостаточно слов');
    //   // currentPage
    //   // const newWords = await getAggregatedWords(17 - 1, 5)
    //   // words = [...words, ...newWords];
    // }

    setUserWords(userWords);

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
    // to reset keyboard status
    isPress = false;
    let possibleAnswers: IWord[] = componentState.possibleAnswers?.slice() || [];
    
    const answer = possibleAnswers[getRandomIntInclusive(0, possibleAnswers.length - 1)];

    if (isLogined) {
      await getWordCurrentData(userId, answer.id);
      // setServerData(data);
    }

    possibleAnswers = possibleAnswers.filter((word) => word !== answer);
    const wordsWithoutAnswer = componentState.appState?.words.filter((word: IWord) => word !== answer);
    
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

  const keyDownHandler = ({key} : KeyboardKey) => {
    if (!isPress) {
      // console.log('key press');
      switch (key) {
        case "1":     
        case "2":
        case "3":
        case "4":  
        case "5":
          checkGuess(document.getElementById(key) as HTMLButtonElement);
          isPress = true; 
          break;
        default: 
          break;
      }
    } 
    
    return false;
  }

  const skipGuess = () => {
    if (componentState.isAnswered) {
      handleWords()
    } else {
      playIncorrect();
      const state = {
        isAnswered: true,
        answerCount:  (componentState.answerCount || 0) + 1
      }
      updateStateByKeys(state);
    }
  }

  const sendWordCurrentData = async (userId: string, wordId: string, answerStatus: boolean) => {
    let learningWord = (serverData as IUserWord).optional.learningWord;
    let counterCorrectAnswer = 0;
    let difficulty = (serverData as IUserWord).difficulty;

    if (componentState.answer.userWord) {
      if (answerStatus) {
        if (difficulty === 'easy') {
          learningWord = (serverData as IUserWord).optional.counterCorrectAnswer + 1 > 2 ? (learnWordToday += 1, true) : false;
        } else {
          learningWord = (serverData as IUserWord).optional.counterCorrectAnswer + 1 > 4 ? (difficulty = 'easy', learnWordToday += 1, true) : false;
        }
        
        counterCorrectAnswer = (serverData as IUserWord).optional.counterCorrectAnswer + 1;
      } else {
        learningWord = false;
        counterCorrectAnswer = 0;
      }
    }

    const answerOrder = [...(serverData as IUserWord).optional.answerOrder.answerArray, answerStatus];

    const wordData: IUserWord = {
      difficulty,
      optional: {
        learningWord,
        counterCorrectAnswer,
        answerOrder: { answerArray: answerOrder }
      }
    };

    try {
      if ((serverData as IUserWord).optional.answerOrder.answerArray.length) {
        apiUsersWords.updateUserWordById(userId, wordId, wordData);
      } else {
        apiUsersWords.createUserWordById(userId, wordId, wordData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const checkGuess = async (target: HTMLButtonElement) => {
    const data_id = target.getAttribute('data-id');
    const rule = data_id === (componentState.answer && componentState.answer.id);

    target.classList.add(rule ? styles.correct : styles.wrong);
    componentState.answer && (componentState.answer['correct'] = rule ? true : false);

    if (rule) {
      playCorrect();
      setcorrectAnswers([...correctAnswers as IWord[], componentState.answer as IWord])
      strick += 1;
    } else {
      playIncorrect();
      setwrongAnswers([...wrongAnswers as IWord[], componentState.answer as IWord])
      allStricks.push(strick);
      strick = 0;
    }

    if (isLogined) {
      // отправлять статистику
      console.log(`${componentState.answer?.word} в статистику`);
      sendWordCurrentData(userId, (componentState.answer?.id as string), (componentState.answer?.correct as boolean));
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
    new Audio(`${EApiParametrs.baseUrl}/${audio}`).play();
  }

  const showAnswer = () => {
    return (
      <>
        <img
          src={`${EApiParametrs.baseUrl}/${componentState.answer?.image}`}
          className={styles.answer}
          alt="Answer Image"
          onClick={togglePlay} 
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
          <span>Знаю - {correctAnswers.length}</span>
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
          <hr/>
          <span>Ошибок - {wrongAnswers.length}</span>
          {wrongAnswers.map(({wordTranslate, word, id, audio}) => {
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
          <button 
            onClick={() => {
              navigate(0);
            }}
          >
            Try again
          </button>
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
          <span>{componentState.answerCount} / {componentState.appState?.words.length as number >= 20 ? 20 : componentState.appState?.words.length }</span>
          <div className={styles.answer__wrapper}>
            {
              componentState.isAnswered 
              ? showAnswer() 
              : showAudioImg()
            }
          </div>

          <div className={styles.words}>
            {componentState.wordsToShow && componentState.wordsToShow.map(({ wordTranslate, id }, index: number) => {
              return (
                <button
                  disabled={componentState.isAnswered}
                  data-id={id}
                  id={`${index + 1}`}
                  onClick={({target}) => checkGuess(target as HTMLButtonElement)}
                  key={id + index}>
                  {index + 1}. {wordTranslate}
                </button>)
            })}
          </div>

          <button 
            id={styles.result} 
            onClick={skipGuess}>
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
          {componentState.answerCount === 20 ? showStatistics() : showBody()}
        </div>
      ) 
    } else {
      return <Loader/>;
    }
  };
