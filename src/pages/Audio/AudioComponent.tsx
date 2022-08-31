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
import { EApiParametrs } from '../../utils/Api';
// import { api } from '../../utils/Api';
// import { Loading } from './Loading';

// TODO:
// 1. Create keyboard support
// 2. 

// const wordsExample = [
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a0",
//     "group": 0,
//     "page": 0,
//     "word": "alcohol",
//     "image": "files/01_0002.jpg",
//     "audio": "files/01_0002.mp3",
//     "audioMeaning": "files/01_0002_meaning.mp3",
//     "audioExample": "files/01_0002_example.mp3",
//     "textMeaning": "<i>Alcohol</i> is a type of drink that can make people drunk.",
//     "textExample": "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
//     "transcription": "[ǽlkəhɔ̀ːl]",
//     "textExampleTranslate": "Человек не должен водить машину после того, как он выпил алкоголь",
//     "textMeaningTranslate": "Алкоголь - это тип напитка, который может сделать людей пьяными",
//     "wordTranslate": "алкоголь"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a2",
//     "group": 0,
//     "page": 0,
//     "word": "boat",
//     "image": "files/01_0005.jpg",
//     "audio": "files/01_0005.mp3",
//     "audioMeaning": "files/01_0005_meaning.mp3",
//     "audioExample": "files/01_0005_example.mp3",
//     "textMeaning": "A <i>boat</i> is a vehicle that moves across water.",
//     "textExample": "There is a small <b>boat</b> on the lake.",
//     "transcription": "[bout]",
//     "textExampleTranslate": "На озере есть маленькая лодка",
//     "textMeaningTranslate": "Лодка - это транспортное средство, которое движется по воде",
//     "wordTranslate": "лодка"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a1",
//     "group": 0,
//     "page": 0,
//     "word": "agree",
//     "image": "files/01_0001.jpg",
//     "audio": "files/01_0001.mp3",
//     "audioMeaning": "files/01_0001_meaning.mp3",
//     "audioExample": "files/01_0001_example.mp3",
//     "textMeaning": "To <i>agree</i> is to have the same opinion or belief as another person.",
//     "textExample": "The students <b>agree</b> they have too much homework.",
//     "transcription": "[əgríː]",
//     "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
//     "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
//     "wordTranslate": "согласна"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a3",
//     "group": 0,
//     "page": 0,
//     "word": "arrive",
//     "image": "files/01_0003.jpg",
//     "audio": "files/01_0003.mp3",
//     "audioMeaning": "files/01_0003_meaning.mp3",
//     "audioExample": "files/01_0003_example.mp3",
//     "textMeaning": "To <i>arrive</i> is to get somewhere.",
//     "textExample": "They <b>arrived</b> at school at 7 a.m.",
//     "transcription": "[əráiv]",
//     "textExampleTranslate": "Они прибыли в школу в 7 часов утра",
//     "textMeaningTranslate": "Приехать значит попасть куда-то",
//     "wordTranslate": "прибыть"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a4",
//     "group": 0,
//     "page": 0,
//     "word": "August",
//     "image": "files/01_0004.jpg",
//     "audio": "files/01_0004.mp3",
//     "audioMeaning": "files/01_0004_meaning.mp3",
//     "audioExample": "files/01_0004_example.mp3",
//     "textMeaning": "<i>August</i> is the eighth month of the year.",
//     "textExample": "Is your birthday in <b>August</b>?",
//     "transcription": "[ɔ́ːgəst]",
//     "textExampleTranslate": "У тебя день рождения в августе?",
//     "textMeaningTranslate": "Август - восьмой месяц года",
//     "wordTranslate": "август"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a5",
//     "group": 0,
//     "page": 0,
//     "word": "breakfast",
//     "image": "files/01_0006.jpg",
//     "audio": "files/01_0006.mp3",
//     "audioMeaning": "files/01_0006_meaning.mp3",
//     "audioExample": "files/01_0006_example.mp3",
//     "textMeaning": "<i>Breakfast</i> is the morning meal.",
//     "textExample": "I ate eggs for <b>breakfast</b>.",
//     "transcription": "[brekfəst]",
//     "textExampleTranslate": "Я ел яйца на завтрак",
//     "textMeaningTranslate": "Завтрак - это утренняя трапеза",
//     "wordTranslate": "завтрак"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a6",
//     "group": 0,
//     "page": 0,
//     "word": "camera",
//     "image": "files/01_0007.jpg",
//     "audio": "files/01_0007.mp3",
//     "audioMeaning": "files/01_0007_meaning.mp3",
//     "audioExample": "files/01_0007_example.mp3",
//     "textMeaning": "A <i>camera</i> is a piece of equipment that takes pictures.",
//     "textExample": "I brought my <b>camera</b> on my vacation.",
//     "transcription": "[kǽmərə]",
//     "textExampleTranslate": "Я принес свою камеру в отпуск",
//     "textMeaningTranslate": "Камера - это часть оборудования, которая делает снимки",
//     "wordTranslate": "камера"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a7",
//     "group": 0,
//     "page": 0,
//     "word": "capital",
//     "image": "files/01_0008.jpg",
//     "audio": "files/01_0008.mp3",
//     "audioMeaning": "files/01_0008_meaning.mp3",
//     "audioExample": "files/01_0008_example.mp3",
//     "textMeaning": "A <i>capital</i> is a city where a country’s government is based.",
//     "textExample": "The <b>capital</b> of the United States is Washington, D.C.",
//     "transcription": "[kæpətl]",
//     "textExampleTranslate": "Столица Соединенных Штатов - Вашингтон, округ Колумбия",
//     "textMeaningTranslate": "Столица - это город, в котором базируется правительство страны",
//     "wordTranslate": "столица"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a8",
//     "group": 0,
//     "page": 0,
//     "word": "catch",
//     "image": "files/01_0009.jpg",
//     "audio": "files/01_0009.mp3",
//     "audioMeaning": "files/01_0009_meaning.mp3",
//     "audioExample": "files/01_0009_example.mp3",
//     "textMeaning": "To <i>catch</i> is to grab or get something.",
//     "textExample": "Did you <b>catch</b> the ball during the baseball game?",
//     "transcription": "[kætʃ]",
//     "textExampleTranslate": "Вы поймали мяч во время игры в бейсбол?",
//     "textMeaningTranslate": "Поймать - значит схватить или получить что-то",
//     "wordTranslate": "поймать"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4a9",
//     "group": 0,
//     "page": 0,
//     "word": "duck",
//     "image": "files/01_0010.jpg",
//     "audio": "files/01_0010.mp3",
//     "audioMeaning": "files/01_0010_meaning.mp3",
//     "audioExample": "files/01_0010_example.mp3",
//     "textMeaning": "A <i>duck</i> is a small water bird.",
//     "textExample": "People feed <b>ducks</b> at the lake.",
//     "transcription": "[dʌk]",
//     "textExampleTranslate": "Люди кормят уток у озера",
//     "textMeaningTranslate": "Утка - маленькая водяная птица",
//     "wordTranslate": "утка"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4aa",
//     "group": 0,
//     "page": 0,
//     "word": "enjoy",
//     "image": "files/01_0011.jpg",
//     "audio": "files/01_0011.mp3",
//     "audioMeaning": "files/01_0011_meaning.mp3",
//     "audioExample": "files/01_0011_example.mp3",
//     "textMeaning": "To <i>enjoy</i> is to like something.",
//     "textExample": "The woman <b>enjoys</b> riding her bicycle.",
//     "transcription": "[indʒɔ́i]",
//     "textExampleTranslate": "Женщина любит кататься на велосипеде",
//     "textMeaningTranslate": "Наслаждаться значит любить что-то",
//     "wordTranslate": "наслаждаться"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4ab",
//     "group": 0,
//     "page": 0,
//     "word": "invite",
//     "image": "files/01_0012.jpg",
//     "audio": "files/01_0012.mp3",
//     "audioMeaning": "files/01_0012_meaning.mp3",
//     "audioExample": "files/01_0012_example.mp3",
//     "textMeaning": "To <i>invite</i> is to ask someone to come to a place or event.",
//     "textExample": "I will <b>invite</b> my friends to my birthday party.",
//     "transcription": "[inváit]",
//     "textExampleTranslate": "Я приглашаю своих друзей на мой день рождения",
//     "textMeaningTranslate": "Пригласить - это попросить кого-нибудь прийти на место или событие",
//     "wordTranslate": "пригласить"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4ac",
//     "group": 0,
//     "page": 0,
//     "word": "month",
//     "image": "files/01_0014.jpg",
//     "audio": "files/01_0014.mp3",
//     "audioMeaning": "files/01_0014_meaning.mp3",
//     "audioExample": "files/01_0014_example.mp3",
//     "textMeaning": "A <i>month</i> is one of 12 periods of time in one year.",
//     "textExample": "January is the first <b>month</b> of the year.",
//     "transcription": "[mʌnθ]",
//     "textExampleTranslate": "январь - первый месяц года",
//     "textMeaningTranslate": "Месяц - это один из 12 периодов времени в году",
//     "wordTranslate": "месяц"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4ad",
//     "group": 0,
//     "page": 0,
//     "word": "travel",
//     "image": "files/01_0015.jpg",
//     "audio": "files/01_0015.mp3",
//     "audioMeaning": "files/01_0015_meaning.mp3",
//     "audioExample": "files/01_0015_example.mp3",
//     "textMeaning": "To <i>travel</i> is to go to a faraway place on vacation or business.",
//     "textExample": "They will <b>travel</b> to Argentina this summer.",
//     "transcription": "[trǽvəl]",
//     "textExampleTranslate": "Этим летом они отправятся в Аргентину",
//     "textMeaningTranslate": "Путешествовать - это отправиться в далекое место на отдых или по делам",
//     "wordTranslate": "путешествовать"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4ae",
//     "group": 0,
//     "page": 0,
//     "word": "love",
//     "image": "files/01_0013.jpg",
//     "audio": "files/01_0013.mp3",
//     "audioMeaning": "files/01_0013_meaning.mp3",
//     "audioExample": "files/01_0013_example.mp3",
//     "textMeaning": "To <i>love</i> is to like something or someone a lot.",
//     "textExample": "I <b>love</b> my family very much.",
//     "transcription": "[lʌv]",
//     "textExampleTranslate": "Я очень люблю свою семью",
//     "textMeaningTranslate": "Любить значит любить что-то или кого-то много",
//     "wordTranslate": "любовь"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4af",
//     "group": 0,
//     "page": 0,
//     "word": "typical",
//     "image": "files/01_0016.jpg",
//     "audio": "files/01_0016.mp3",
//     "audioMeaning": "files/01_0016_meaning.mp3",
//     "audioExample": "files/01_0016_example.mp3",
//     "textMeaning": "If something is <i>typical</i>, it is normal, or something that usually happens.",
//     "textExample": "My <b>typical</b> breakfast is toast and eggs.",
//     "transcription": "[típikəl]",
//     "textExampleTranslate": "Мой типичный завтрак - тост и яйца",
//     "textMeaningTranslate": "Если что-то типичное, это нормально, или что-то, что обычно происходит",
//     "wordTranslate": "типичный"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4b0",
//     "group": 0,
//     "page": 0,
//     "word": "visit",
//     "image": "files/01_0017.jpg",
//     "audio": "files/01_0017.mp3",
//     "audioMeaning": "files/01_0017_meaning.mp3",
//     "audioExample": "files/01_0017_example.mp3",
//     "textMeaning": "To <i>visit</i> is to go and spend time in another place or see another person.",
//     "textExample": "She wants to <b>visit</b> her grandmother.",
//     "transcription": "[vízit]",
//     "textExampleTranslate": "Она хочет навестить свою бабушку",
//     "textMeaningTranslate": "Посетить - значит пойти и провести время в другом месте или увидеть другого человека",
//     "wordTranslate": "посещение"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4b1",
//     "group": 0,
//     "page": 0,
//     "word": "weather",
//     "image": "files/01_0018.jpg",
//     "audio": "files/01_0018.mp3",
//     "audioMeaning": "files/01_0018_meaning.mp3",
//     "audioExample": "files/01_0018_example.mp3",
//     "textMeaning": "<i>Weather</i> is the temperature and the state of the outdoors.",
//     "textExample": "Today’s <b>weather</b> is rainy and cloudy.",
//     "transcription": "[weðər]",
//     "textExampleTranslate": "Сегодня погода дождливая и облачная",
//     "textMeaningTranslate": "Погода это температура и состояние на улице",
//     "wordTranslate": "погода"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4b2",
//     "group": 0,
//     "page": 0,
//     "word": "wine",
//     "image": "files/01_0020.jpg",
//     "audio": "files/01_0020.mp3",
//     "audioMeaning": "files/01_0020_meaning.mp3",
//     "audioExample": "files/01_0020_example.mp3",
//     "textMeaning": "<i>Wine</i> is an alcoholic drink made from grapes.",
//     "textExample": "The store carried both red and white <b>wine</b>.",
//     "transcription": "[wain]",
//     "textExampleTranslate": "В магазине было красное и белое вино",
//     "textMeaningTranslate": "Вино - это алкогольный напиток из винограда",
//     "wordTranslate": "вино"
//   },
//   {
//     "id": "5e9f5ee35eb9e72bc21af4b3",
//     "group": 0,
//     "page": 0,
//     "word": "week",
//     "image": "files/01_0019.jpg",
//     "audio": "files/01_0019.mp3",
//     "audioMeaning": "files/01_0019_meaning.mp3",
//     "audioExample": "files/01_0019_example.mp3",
//     "textMeaning": "A <i>week</i> is a period of time that is seven days long.",
//     "textExample": "What are you doing next <b>week</b>?",
//     "transcription": "[wiːk]",
//     "textExampleTranslate": "Что ты делаешь на следующей неделе?",
//     "textMeaningTranslate": "Неделя - это период времени, который длится семь дней",
//     "wordTranslate": "неделя"
//   }
// ]

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
    const res = await fetch(`${EApiParametrs.baseUrl}/words?page=${getRandomIntInclusive(0,29)}&group=${getRandomIntInclusive(0, 5)}`)

    return await res.json();
  }

  useEffect(() => {
    setGameWords();
  }, []);

  const setGameWords = async () => {
    // const words = await api.getWords({
    //   group: getRandomIntInclusive(0,29),
    //   numberPage: getRandomIntInclusive(0, 5),
    // }); 
    // const words = fafa.slice();

    // наши 20 слов
    
    // if words in global state then take it
    // else fetch 
    const words = await getWords()

    const newState = {
      appState:  { isLoaded: true, words },
      possibleAnswers : words,
    }

    updateStateByKeys(newState);
  }

  const handleWords = async () => {
    let possibleAnswers: IWord[] = componentState.possibleAnswers?.slice();
    
    const answer = possibleAnswers[getRandomIntInclusive(0, possibleAnswers.length - 1)];
    possibleAnswers = possibleAnswers.filter((word) => word !== answer);
    const wordsWithoutAnswer = componentState.appState?.words.filter(word => word !== answer);
    
    const wordsToCreateArray = shuffleArray(wordsWithoutAnswer).slice(0, 4);
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

    if (rule) {
      playCorrect();
    } else {
      playIncorrect();
    }
    
    componentState.answers?.push(componentState.answer)

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
          {componentState.answers?.map(({wordTranslate, word, id, audio}) => {
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
                  key={id}>
                  {index + 1}. {wordTranslate}
                </button>)
            })}
          </div>

          <button 
            id={styles.result} 
            onClick={handleWords}>
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
          {componentState.answerCount === 5 ? showStatistics() : showBody()}
        </div>
      ) 
    } else {
      // return <Loading/>;
    }
  };
