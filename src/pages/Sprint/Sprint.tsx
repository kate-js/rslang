import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Sprint.module.css';
import { setSprintWordSet } from '../../store/sprintSlice';
import { setIsFromTutorial } from '../../store/levelChoseSlice';
import { TState } from '../../store/store';
import { ERoutes, WordResponse } from '../../utils/constants';
import { LEVELS } from '../../data/Data';
// import { setLevel, setPage } from '../GroupLevel/GroupPage';
import { apiWords } from '../../api/apiWords';
import { apiUsersWords } from '../../api/apiUsersWords';
import { EApiParametrs, IUserWord, initialUserWordData } from '../../api/apiConstants';
import iconClose from './assets/close.png';
import iconArrow from './assets/arrow.png';
import iconNote from './assets/music-note.svg';
import iconNoteOff from './assets/music-note-off.svg';
import iconSpeaker from './assets/speaker.svg';
import audioCorrect from './assets/correct.mp3';
import audioWrong from './assets/incorrect.mp3';

import { Loader } from '../../components/UI/Loader/Loader';
import { Button } from '../../components/UI/Button/Button';
import { Modal } from './Modal/Modal';
import Timer from './Timer/Timer';
import CircleList from './CircleList/CircleList';
import LevelIconList from './LevelIconList/LevelIconList';

const POINT_INCREMENT_BY_LEVEL = [10, 20, 40, 80];
const CIRCLE = [0, 1, 2];

function getRandomInteger(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const answerCorrect: WordResponse[] = [];
const answerWrong: WordResponse[] = [];
let currentPage = 0;
let isWordsLoading = false;
let wordCurrentData: IUserWord = initialUserWordData as IUserWord;

export const Sprint = () => {
  const dispatch = useDispatch();
  const sprintWordSet = useSelector((state: TState) => state.sprint.wordSet) as WordResponse[];
  const isFromTutorial = useSelector((state: TState) => state.level.isFromTutorial);
  const fromTutorialNumberPage = useSelector((state: TState) => state.level.numberPage);
  const groupLevel = useSelector((state: TState) => state.level.level) as keyof typeof LEVELS;
  const isLogined = useSelector((state: TState) => state.auth.isLogined);
  const currentUser = useSelector((state: TState) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [pointsCounter, setPointsCounter] = useState(0);
  const [pointsLevel, setPointsLevel] = useState(0);
  const [ansewerRigthCounter, setAnsewerRigthCounter] = useState(0);
  const [wordCurrent, setWordCurrent] = useState({} as WordResponse);
  // const [wordCurrentData, setWordCurrentData] = useState({} as IUserWord);
  const [wordRandomAnswer, setWordRandomAnswer] = useState('');
  const [wordCounter, setWordCounter] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // get current words list
  const getCurrentWordsList = async (numberPage: number) => {
    try {
      isWordsLoading = true;
      const words = await apiWords.getWords({
        group: LEVELS[groupLevel],
        numberPage: numberPage
      });
      dispatch(setSprintWordSet([...sprintWordSet, ...words]));
    } catch (err) {
      console.log(err);
    } finally {
      isWordsLoading = false;
    }
  };

  useEffect(() => {
    if (isFromTutorial) {
      currentPage = fromTutorialNumberPage;
    } else {
      currentPage = getRandomInteger(0, 29);
    }
    getCurrentWordsList(currentPage);

    document.addEventListener('keydown', handleArrowDown);
  }, []);

  // handel data about current word
  const getWordCurrentData = async (userId: string, wordId: string) => {
    try {
      const wordData = await apiUsersWords.getUserWordById(userId, wordId);

      wordCurrentData = wordData;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === '404') {
          console.log('Слово ранее не использовалось');
          wordCurrentData = initialUserWordData;
        }
      }
    }
  };

  const sendWordCurrentData = async (userId: string, wordId: string, isCorrectAnswer: boolean) => {
    let learningWord = false;
    let counterCorrectAnswer = 0;

    if (isCorrectAnswer) {
      learningWord = wordCurrentData.optional.counterCorrectAnswer + 1 > 2 ? true : false;
      counterCorrectAnswer = wordCurrentData.optional.counterCorrectAnswer + 1;
    }
    const answerOrder = [...wordCurrentData.optional.answerOrder.answerArray, isCorrectAnswer];

    const wordData: IUserWord = {
      difficulty: wordCurrentData.difficulty,
      optional: {
        learningWord: learningWord,
        counterCorrectAnswer: counterCorrectAnswer,
        answerOrder: { answerArray: answerOrder }
      }
    };

    try {
      if (wordCurrentData.optional.answerOrder.answerArray.length) {
        apiUsersWords.updateUserWordById(userId, wordId, wordData);
      } else {
        apiUsersWords.createUserWordById(userId, wordId, wordData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // load additional words if it's near end
    const isWordsNearEnd =
      sprintWordSet.length && wordCounter + 10 > sprintWordSet.length && currentPage > 0;

    if (isWordsNearEnd && !isWordsLoading) {
      if (isFromTutorial) {
        currentPage = currentPage - 1;
      } else {
        currentPage = currentPage - 1 > 0 ? currentPage - 1 : 29;
      }
      getCurrentWordsList(currentPage);
    }

    // handel wordCounter change
    if (sprintWordSet.length) {
      if (isLogined) {
        getWordCurrentData(currentUser.userId, sprintWordSet[wordCounter].id);
      }
      setIsLoading(false);
      setWordCurrent(sprintWordSet[wordCounter]);
      const maxRandom =
        wordCounter + 1 > sprintWordSet.length - 1 ? sprintWordSet.length - 1 : wordCounter + 1;
      setWordRandomAnswer(sprintWordSet[getRandomInteger(wordCounter, maxRandom)].wordTranslate);
    }
  }, [sprintWordSet, wordCounter]);

  // sound functionality and handel word audio play
  const handelWordAudioPlay = () => {
    const wordAudio = new Audio(`${EApiParametrs.baseUrl}/${wordCurrent.audio}`);
    wordAudio.play();
  };

  const playAnswerSound = (flag: boolean) => {
    let audio;
    if (flag) {
      audio = new Audio(audioCorrect);
    } else {
      audio = new Audio(audioWrong);
    }
    audio.play();
  };

  const toggleIsSoundOn = () => {
    setIsSoundOn((prev) => !prev);
  };

  // check answer functionality
  const increasePointsLevel = () => {
    if (ansewerRigthCounter <= 2) {
      setAnsewerRigthCounter((prev) => prev + 1);
    } else if (pointsLevel < 2) {
      setPointsLevel((prev) => prev + 1);
      setAnsewerRigthCounter(0);
    } else if (pointsLevel === 2) {
      setPointsLevel((prev) => prev + 1);
    }
  };

  const handelAnswer = (flag: boolean) => {
    let isCorrectAnswer = wordCurrent.wordTranslate === wordRandomAnswer;
    if (!flag) {
      isCorrectAnswer = wordCurrent.wordTranslate !== wordRandomAnswer;
    }

    if (isSoundOn) {
      playAnswerSound(isCorrectAnswer);
    }

    if (isLogined) {
      sendWordCurrentData(currentUser.userId, wordCurrent.id, isCorrectAnswer);
    }

    if (isCorrectAnswer) {
      setPointsCounter((prev) => prev + POINT_INCREMENT_BY_LEVEL[pointsLevel]);
      increasePointsLevel();
      answerCorrect.push(wordCurrent);
    } else {
      setAnsewerRigthCounter(0);
      setPointsLevel(0);
      answerWrong.push(wordCurrent);
    }

    if (wordCounter < sprintWordSet.length - 1) {
      setWordCounter((prev) => prev + 1);
    } else {
      setIsModalVisible(true);
      setIsFromTutorial(false);
    }
  };

  const handelTrulyAnswer = () => {
    handelAnswer(true);
  };

  const handelFalsyAnswer = () => {
    handelAnswer(false);
  };

  const handleArrowDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handelFalsyAnswer();
    } else if (e.key === 'ArrowRight') {
      handelTrulyAnswer();
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.sprint}>
      <Timer setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />

      <div className={styles.main}>
        <div className={styles.counter_section}>
          <p className={styles.counter}>{pointsCounter}</p>
          <img
            src={isSoundOn ? iconNote : iconNoteOff}
            onClick={toggleIsSoundOn}
            alt="volume"
            className={styles.note}
          />
        </div>

        <div className={styles.word_section}>
          <CircleList ansewerRigthCounter={ansewerRigthCounter} circle={CIRCLE} />

          <p className={styles.point_over}>+{POINT_INCREMENT_BY_LEVEL[pointsLevel]} за слово</p>

          <LevelIconList pointsLevel={pointsLevel} levels={POINT_INCREMENT_BY_LEVEL} />

          <p className={styles.word}>{!isLoading ? wordCurrent.word : null}</p>

          <img
            onClick={handelWordAudioPlay}
            src={iconSpeaker}
            alt="speaker"
            className={styles.speaker}
          />

          <p className={styles.translation}>{!isLoading ? wordRandomAnswer : null}</p>

          <div className={styles.button_section}>
            <Button func={handelFalsyAnswer} value="Не верно" />
            <Button func={handelTrulyAnswer} value="Верно" />
          </div>

          <div className={styles.arrow_section}>
            <img src={iconArrow} alt="arrow-left" className={styles.arrow_left} />
            <img src={iconArrow} alt="arrow-right" className={styles.arrow_right} />
          </div>
        </div>
      </div>

      <div className={styles.close_section}>
        <Link to={ERoutes.games} className={styles.link}>
          <img src={iconClose} alt="close" className={styles.close_button} />
        </Link>
      </div>

      {isModalVisible && (
        <Modal
          answerWrong={answerWrong}
          answerCorrect={answerCorrect}
          setIsModalVisible={setIsModalVisible}></Modal>
      )}
    </div>
  );
};
