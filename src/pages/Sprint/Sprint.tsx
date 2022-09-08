import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Sprint.module.css';
import { getStatistics, sendStatistics } from './handelStatistics';
import { sendWordCurrentData } from './handelWordData';
import { setSprintWordSet } from '../../store/sprintSlice';
import { setIsFromTutorial } from '../../store/levelChoseSlice';
import { TState } from '../../store/store';
import {
  ERoutes,
  WordResponse,
  getRandomInteger,
  CIRCLE,
  POINT_INCREMENT_BY_LEVEL
} from '../../utils/constants';
import { LEVELS } from '../../data/Data';
import { apiWords } from '../../api/apiWords';
import { apiAggregatedWords } from '../../api/apiUsersAggregatedWords';
// import { apiUsersStatistic } from '../../api/apiUsersStatistic';
import {
  EApiParametrs,
  IUserStatistics,
  WordResponseWithData,
  WordWithDataResponse
} from '../../api/apiConstants';
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

const answerCorrect: WordResponse[] = [];
const answerWrong: WordResponse[] = [];
let currentPage = 0;
let isLoadingAdditionalWordsList = false;
let userStatistic: IUserStatistics;
let learnWordToday = 0;
const allStricks: number[] = [];
let strick = 0;

export const Sprint = () => {
  const dispatch = useDispatch();
  const sprintWordSet = useSelector((state: TState) => state.sprint.wordSet) as WordResponse[];
  const isFromTutorial = useSelector((state: TState) => state.level.isFromTutorial);
  const fromTutorialNumberPage = useSelector((state: TState) => state.level.numberPage);
  const groupLevel = useSelector((state: TState) => state.level.level) as keyof typeof LEVELS;

  const currentUser = useSelector((state: TState) => state.auth.currentUser);
  const isLogined = useSelector((state: TState) => state.auth.isLogined);
  const isAuthLoading = useSelector((state: TState) => state.auth.isAuthLoading);

  const [isLoadingFirstWordsList, setIsLoadingFirstWordsList] = useState(true);
  const [pointsLevel, setPointsLevel] = useState(0);
  const [pointsCounter, setPointsCounter] = useState(0);
  const [ansewerRigthCounter, setAnsewerRigthCounter] = useState(0);

  const [wordCurrent, setWordCurrent] = useState({} as WordResponse);
  const [wordRandomAnswer, setWordRandomAnswer] = useState('');
  const [wordCounter, setWordCounter] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  //////////// get current words list
  const getCurrentWordsList = async (numberPage: number, isLoginedChanges = false) => {
    isLoadingAdditionalWordsList = true;
    let words = [] as WordResponseWithData[];
    try {
      if (isLogined) {
        words = await getAggregatedWords(numberPage);
      } else {
        // get common words
        words = (await apiWords.getWords({
          group: LEVELS[groupLevel],
          numberPage: numberPage
        })) as WordResponseWithData[];
      }

      if (isLoginedChanges) {
        dispatch(setSprintWordSet(words));
      } else {
        dispatch(setSprintWordSet([...sprintWordSet, ...words]));
      }
    } catch (err) {
      console.log(err);
    } finally {
      isLoadingAdditionalWordsList = false;
    }
  };

  const getAggregatedWords = async (numberPage: number) => {
    let resWords = [] as WordResponseWithData[];
    const query = {
      group: ``,
      page: ``,
      wordsPerPage: '20',
      filter: `{"$and": [{"group":${LEVELS[groupLevel]}}, {"page":${numberPage}}]}`
    };

    const arrWordsWithDada = (await apiAggregatedWords.getAllAggregatedWords(
      currentUser.userId,
      query
    )) as unknown;
    const wordsWithDada = arrWordsWithDada as WordWithDataResponse[];

    // check is word learned and add id
    if (isFromTutorial) {
      resWords = wordsWithDada[0].paginatedResults
        .filter((el) => {
          return !el.userWord?.optional.learningWord;
        })
        .map((el) => {
          const newEl = { ...el };
          newEl.id = el._id;
          return newEl;
        });
    } else {
      resWords = wordsWithDada[0].paginatedResults.map((el) => {
        const newEl = { ...el };
        newEl.id = el._id;
        return newEl;
      });
    }

    return resWords;
  };

  useEffect(() => {
    if (isFromTutorial) {
      console.log('isFromTutorial', isFromTutorial);
      currentPage = fromTutorialNumberPage - 1;
    } else {
      currentPage = getRandomInteger(0, 29);
    }
    getCurrentWordsList(currentPage);
  }, []);

  useEffect(() => {
    if (isFromTutorial) {
      currentPage = fromTutorialNumberPage - 1;
    } else {
      currentPage = getRandomInteger(0, 29);
    }
    getCurrentWordsList(currentPage, true);

    if (isLogined) {
      handelGetStatistics(currentUser.userId);
    }
  }, [isLogined]);

  useEffect(() => {
    // load additional words if it's near end
    const isWordsNearEnd =
      sprintWordSet.length && wordCounter + 10 > sprintWordSet.length && currentPage > 0;

    if (isWordsNearEnd && !isLoadingAdditionalWordsList) {
      if (isFromTutorial) {
        currentPage = currentPage - 1;
      } else {
        currentPage = currentPage - 1 > 0 ? currentPage - 1 : 29;
      }
      getCurrentWordsList(currentPage);
    }

    // console.log('sprintWordSet', sprintWordSet);
  }, [wordCounter]);

  useEffect(() => {
    // handel wordCounter change
    if (sprintWordSet.length) {
      setIsLoadingFirstWordsList(false);
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

  const handelAnswer = async (flag: boolean) => {
    let isCorrectAnswer = wordCurrent.wordTranslate === wordRandomAnswer;
    if (!flag) {
      isCorrectAnswer = wordCurrent.wordTranslate !== wordRandomAnswer;
    }

    if (isSoundOn) {
      playAnswerSound(isCorrectAnswer);
    }

    if (isLogined) {
      learnWordToday = await sendWordCurrentData(
        currentUser.userId,
        wordCurrent.id,
        isCorrectAnswer,
        wordCurrent,
        learnWordToday
      );
    }

    if (isCorrectAnswer) {
      setPointsCounter((prev) => prev + POINT_INCREMENT_BY_LEVEL[pointsLevel]);
      increasePointsLevel();
      answerCorrect.push(wordCurrent);
      strick += 1;
    } else {
      setAnsewerRigthCounter(0);
      setPointsLevel(0);
      answerWrong.push(wordCurrent);
      allStricks.push(strick);
      strick = 0;
    }

    // exit it it's end
    if (wordCounter < sprintWordSet.length - 1) {
      setWordCounter((prev) => prev + 1);
    } else {
      setIsModalVisible(true);
      dispatch(setIsFromTutorial(false));
    }
  };

  const handelTrulyAnswer = () => {
    handelAnswer(true);
  };

  const handelFalsyAnswer = () => {
    handelAnswer(false);
  };

  // handel keyboard interaction
  const handleArrowDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isModalVisible) {
      if (e.key === 'ArrowLeft') {
        handelFalsyAnswer();
      } else if (e.key === 'ArrowRight') {
        handelTrulyAnswer();
      }
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      (ref.current as HTMLDivElement).focus();
    }
  }, []);

  ////////////  statistic
  const handelGetStatistics = async (userId: string) => {
    userStatistic = await getStatistics(userId);

    // console.log('userStatistic', userStatistic);
  };

  useEffect(() => {
    if (isModalVisible && isLogined) {
      sendStatistics(
        currentUser.userId,
        userStatistic,
        learnWordToday,
        answerCorrect.length,
        answerWrong.length,
        allStricks
      );
    }
  }, [isModalVisible]);

  return isLoadingFirstWordsList && isAuthLoading ? (
    <Loader />
  ) : (
    <div className={styles.sprint} onKeyDown={handleArrowDown} tabIndex={-1} ref={ref}>
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

          <p className={styles.word}>{!isLoadingFirstWordsList ? wordCurrent.word : null}</p>

          <img
            onClick={handelWordAudioPlay}
            src={iconSpeaker}
            alt="speaker"
            className={styles.speaker}
          />

          <p className={styles.translation}>{!isLoadingFirstWordsList ? wordRandomAnswer : null}</p>

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
