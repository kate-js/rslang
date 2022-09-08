import styles from './AudioComponent.module.css'
import stylesModal from '../Sprint/Modal/Modal.module.css'
import { getRandomIntInclusive, shuffleArray } from '../../utils/utils';
import { 
  ERoutes, 
  IComponentState, 
  IState, 
  IVolumeSettings, 
  IWord, 
  KeyboardKey, 
  keys, 
  WordResponse 
} from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Loader } from '../../components/UI/Loader/Loader';
import { TState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { apiUsersWords }  from '../../api/apiUsersWords'
import { 
  EApiParametrs, 
  IUserWord, 
  initialUserWordData, 
  IUserStatistics, 
  WordWithDataResponse
} from '../../api/apiConstants';
import { LEVELS } from '../../data/Data';
import correct from './assets/sounds/correct.mp3'
import wrong from './assets/sounds/incorrect.mp3'
import audioImg from './assets/audio.png'
import muteImg from './assets/volume-mute.png'
import unmuteImg from './assets/volume.png'
import exit from './assets/close.png'
import fullscreen from './assets/fullscreen.svg'
import { apiAggregatedWords } from '../../api/apiUsersAggregatedWords';
import { setIsFromTutorial } from '../../store/levelChoseSlice';
import { getStatistics, sendStatistics } from './handelStatistics'

let currentPage = 0;
let isPress = false;
let newWords = 0;
const allStricks: number[] = [];
let strick = 0;
let userStatistic: IUserStatistics;

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
  const dispatch = useDispatch();

  const [userWords, setUserWords] = useState<WordResponse[]>();
  // const [isAddLoaded, setIsAddLoaded] = useState<boolean>(false);

  const [correctAnswers, setcorrectAnswers] = useState<IWord[]>([]);
  const [wrongAnswers, setwrongAnswers] = useState<IWord[]>([]);
  const [serverData, setServerData] = useState<IUserWord>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [playCorrect] = useSound(correct, {
    volume: componentState.volumeSettings?.volume
  });
  const [playIncorrect] = useSound(wrong, {
    volume: componentState.volumeSettings?.volume
  });

  const isFromTutorial = useSelector((state: TState) => state.level.isFromTutorial);
  const tutorialNumberPage = useSelector((state: TState) => state.level.numberPage) - 1;
  const groupLevel = useSelector((state: TState) => state.level.level) as keyof typeof LEVELS;

  const isLogined = useSelector((state: TState) => state.auth.isLogined);
  const userId: string = useSelector((state: TState) => state.auth.currentUser.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFromTutorial) {
      currentPage = tutorialNumberPage
    } else {
      currentPage = getRandomIntInclusive(0, 29);
    }

    if (isLogined) {
      handelGetStatistics(userId);
    }
    
    setGameWords();
  }, [isLogined]);

  // useEffect(() => {
  //   const addData = async () => {
  //     if (componentState.appState?.isLoaded && componentState.appState?.words.length < 20) {
  //       let newPage = currentPage;
  //       newPage -= 1;
  //       const newWords = await getAggregatedWords(newPage, LEVELS[groupLevel], isFromTutorial ? true : false)

  //       const combinedArray = [...componentState.appState.words, ...newWords];

  //       const newState = {
  //         appState:  { isLoaded: true, words: combinedArray },
  //         possibleAnswers : combinedArray,
  //       }
  //       // setIsAddLoaded(true);
  //       updateStateByKeys(newState);
  //     }
  //   }

  //   addData();
  // }, [componentState.appState?.words])

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
  
  useEffect(() => {
    if (isModalOpened && isLogined) {
      sendStatistics(userId, userStatistic, newWords, correctAnswers.length, wrongAnswers.length, allStricks)
    }
  }, [isModalOpened])

  useEffect(() => {
    if (componentState.appState?.isLoaded) {
      if (componentState.answerCount === componentState.appState?.words.length) {
        setIsModalOpened(true);
      }
    }
    
  })

  const handelGetStatistics = async (userId: string) => {
    userStatistic = await getStatistics(userId);
  };

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
    )) as unknown;

    const wordsWithData = aggregatedWords as WordWithDataResponse[];

    const normalWords = wordsWithData[0].paginatedResults.map((word: WordResponse) => {
      const wordObj = {...word};
      wordObj.id = word._id;
      return wordObj
    });

    return normalWords;
  }

  const setGameWords = async () => {
    
    // make fetch request using page and level
    let words: WordResponse[] = []; 
    let userWords: WordResponse[] = [];
    
    if (isFromTutorial && isLogined) {
      userWords = await getAggregatedWords(currentPage, LEVELS[groupLevel], true);
      words = userWords;

    } else if (isLogined) {
      userWords = await getAggregatedWords(currentPage, LEVELS[groupLevel], false);

      words = userWords;
    } else {
      words = await getWords(currentPage, LEVELS[groupLevel]); 
    }

    // если недостаточно слов, то дозапрашиваем слова
    if (words.length < 20) {
      // console.log('мало');
    }

    const newState = {
      appState:  { isLoaded: true, words },
      possibleAnswers : words,
    }

    dispatch(setIsFromTutorial(false));
    setUserWords(userWords);
    updateStateByKeys(newState);
  }

  const handleWords = async () => {
    // to reset keyboard status
    isPress = false;
    
    let possibleAnswers: WordResponse[] = componentState.possibleAnswers?.slice() || [];
    
    const answer = possibleAnswers[getRandomIntInclusive(0, possibleAnswers.length - 1)];

    if (isLogined) {
      await getWordCurrentData(userId, answer.id);
    }

    possibleAnswers = possibleAnswers.filter((word) => word !== answer);
    const wordsWithoutAnswer = componentState.appState?.words.filter((word: WordResponse) => word !== answer);
    
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

  const skipGuess = (e: React.MouseEvent) => {
    if (componentState.isAnswered) {
      handleWords();
    } else {
      checkGuess(e.target as HTMLButtonElement);
    }
  }

  const sendWordCurrentData = async (userId: string, wordId: string, isCorrect: boolean) => {
    let learningWord = false;
    let counterCorrectAnswer = (serverData as IUserWord).optional.counterCorrectAnswer;
    let difficulty = (serverData as IUserWord).difficulty;

    if (isCorrect) {
      counterCorrectAnswer = counterCorrectAnswer + 1;

      if (difficulty === 'hard' && counterCorrectAnswer > 4) {
        learningWord = true;
        difficulty = 'easy'
      } else if (difficulty === 'easy' && counterCorrectAnswer > 2) {
        learningWord = true;
      }
      
    } else {
      counterCorrectAnswer = 0;
    }
    
    if (!(componentState.answer as IWord).userWord) {
      newWords = newWords + 1;
    }

    const answerOrder = [...(serverData as IUserWord).optional.answerOrder.answerArray, isCorrect];

    const wordData: IUserWord = {
      difficulty,
      optional: {
        learningWord,
        counterCorrectAnswer,
        answerOrder: { answerArray: answerOrder }
      }
    };

    // console.log(wordData);

    try {
      if ((serverData as IUserWord).optional.answerOrder.answerArray.length) {
        // console.log('upd');
        apiUsersWords.updateUserWordById(userId, wordId, wordData);
      } else {
        // console.log('create');
        apiUsersWords.createUserWordById(userId, wordId, wordData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const checkGuess = async (target: HTMLButtonElement) => {
    const data_id = target.getAttribute('data-id');
    const rule = data_id === (componentState.answer && componentState.answer.id);

    if (data_id) {
      target.classList.add(rule ? styles.correct : styles.wrong);
    } 

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
      <div className={stylesModal.modal}>
        <div className={stylesModal.content}>
          <h2 className={stylesModal.title}>Результаты игры</h2>
          <div className={stylesModal.result_wrap}>
            <div className={stylesModal.wrong_wrap}>
              <div className={stylesModal.section_header}>
                <h3 className={stylesModal.subtitle}>Ошибок</h3>
                <span className={stylesModal.wrong_counter}>
                  {wrongAnswers.length ? wrongAnswers.length : 0}
                </span>
              </div>
              <ul className={stylesModal.section_content}>
                {wrongAnswers.map(({wordTranslate, word, id, audio}) => {
                  return (
                    <li key={id} className={stylesModal.section_item}>
                      <img
                        className={stylesModal.speaker}
                        src={audioImg}
                        alt="Audio Img"
                        onClick={() => tooglePlayStatistics(audio)}
                      />
                      <span className={stylesModal.word}>{word}</span>
                      <span className={stylesModal.translation}>- {wordTranslate}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={stylesModal.correct_wrap}>
              <div className={stylesModal.section_header}>
                <h3 className={stylesModal.subtitle}>Знаю</h3>
                <span className={stylesModal.correct_counter}>
                  {correctAnswers.length ? correctAnswers.length : 0}
                </span>
              </div>
              <ul className={stylesModal.section_content}>
                {correctAnswers.map(({wordTranslate, word, id, audio}) => {
                  return (
                    <li key={id} className={stylesModal.section_item}>
                      <img
                        className={stylesModal.speaker}
                        src={audioImg}
                        alt="Audio Img"
                        onClick={() => tooglePlayStatistics(audio)}
                      />
                      <span className={stylesModal.word}>{word}</span>
                      <span className={stylesModal.translation}>- {wordTranslate}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={stylesModal.links_wrap}>
            <Link 
              to={ERoutes.games} 
              className={stylesModal.link}>
              Вернуться к выбору игры
            </Link>
            <Link 
                onClick={() => navigate(0)}
                className={stylesModal.link} to={''}>
                Продолжить играть
            </Link>
          </div>
        </div>
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
            onClick={(e: React.MouseEvent) => skipGuess(e)}
            >
              {componentState.isAnswered ? '⟶' : 'Не знаю'}
          </button>

        </div>
      </div>
    )
  }

  if (componentState.isWelcomeScreen) {
    return (
      <div className={styles.start__game}>
        <p>Выберите один верный перевод слова из пяти. Для управления игрой используйте клавиши 1, 2, 3, 4, 5, либо просто кликайте мышкой.</p>
        <button
        onClick={() => updateStateByKey('isWelcomeScreen', false)}
      >Start Game</button>
      </div>
      
    )
  }

  if (componentState.appState?.isLoaded) {
      return (
        <div className={styles.audio}>
          {isModalOpened ? showStatistics() : showBody()}
        </div>
      ) 
    } else {
      return <Loader/>;
    }
  };
