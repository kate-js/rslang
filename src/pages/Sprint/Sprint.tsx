import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Sprint.module.css';
import { setSprintWordSet } from '../../store/sprintSlice';
import { TState } from '../../store/store';
import { ERoutes, WordResponse } from '../../utils/constants';
import { apiWords } from '../../api/apiWords';
import iconClose from './assets/close.png';
import iconArrow from './assets/arrow.png';

import iconNote from './assets/note.png';

import { Button } from '../../components/UI/Button/Button';
import Timer from './Timer/Timer';
import CircleList from './CircleList/CircleList';
import LevelIconList from './LevelIconList/LevelIconList';
import { Modal } from './Modal/Modal';

const POINT_INCREMENT_BY_LEVEL = [10, 20, 40, 80];
const CIRCLE = [0, 1, 2];

function getRandomInteger(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const Sprint = () => {
  const dispatch = useDispatch();
  const sprintWordSet = useSelector((state: TState) => state.sprint.wordSet) as WordResponse[];
  const isFromTutorial = useSelector((state: TState) => state.sprint.isFromTutorial);
  const [isLoading, setIsLoading] = useState(false);
  const [pointsCounter, setPointsCounter] = useState(0);
  const [pointsLevel, setPointsLevel] = useState(0);
  // const [pointsIncrement, setPointsIncrement] = useState(POINT_INCREMENT_BY_LEVEL[0]);
  const [ansewerRigthCounter, setAnsewerRigthCounter] = useState(0);
  const [wordCurrent, setWordCurrent] = useState({} as WordResponse);
  const [wordRandomAnswer, setWordRandomAnswer] = useState('');
  const [wordCounter, setWordCounter] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const increasePointsLevel = () => {
    if (ansewerRigthCounter <= 2) {
      setAnsewerRigthCounter((prev) => prev + 1);
    } else if (pointsLevel <= 2) {
      setPointsLevel((prev) => prev + 1);
      setAnsewerRigthCounter(0);
    }
  };

  const handelAnswer = (flag: boolean) => {
    let isCorrectAnswer = wordCurrent.wordTranslate === wordRandomAnswer;
    if (!flag) {
      isCorrectAnswer = wordCurrent.wordTranslate !== wordRandomAnswer;
    }
    if (isCorrectAnswer) {
      setPointsCounter((prev) => prev + POINT_INCREMENT_BY_LEVEL[pointsLevel]);
      increasePointsLevel();
    } else {
      setAnsewerRigthCounter(0);
      setPointsLevel(0);
    }
    console.log('wordCounter', wordCounter);
    console.log('sprintWordSet.length - 1', sprintWordSet.length - 1);
    if (wordCounter < sprintWordSet.length - 1) {
      setWordCounter((prev) => prev + 1);
    } else {
      // setIsModalVisible(true);
    }
  };

  const handelTrulyAnswer = () => {
    handelAnswer(true);
  };

  const handelFalsyAnswer = () => {
    handelAnswer(false);
  };

  const handleArrowDown = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.key === 'ArrowLeft') {
      handelFalsyAnswer();
    } else if (e.key === 'ArrowRight') {
      handelTrulyAnswer();
    }
  };

  // get current words
  const getCurrentWordsList = async () => {
    try {
      setIsLoading(true);
      const words = await apiWords.getWords({ group: 1, numberPage: 1 });
      dispatch(setSprintWordSet(words));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // modal functionality
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };

  // useEffects

  useEffect(() => {
    if (!isFromTutorial) {
      getCurrentWordsList();
    }
    document.addEventListener('keydown', handleArrowDown);
  }, []);

  // handel word change
  useEffect(() => {
    if (sprintWordSet.length) {
      setWordCurrent(sprintWordSet[wordCounter]);

      const maxRandom =
        wordCounter + 2 > sprintWordSet.length - 1 ? sprintWordSet.length - 1 : wordCounter + 2;
      setWordRandomAnswer(sprintWordSet[getRandomInteger(wordCounter, maxRandom)].wordTranslate);
    }
  }, [sprintWordSet, wordCounter]);

  return (
    <div className={styles.sprint}>
      <Timer setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />

      <div className={styles.main}>
        <div className={styles.counter_section}>
          <p className={styles.counter}>{pointsCounter}</p>
          <img src={iconNote} alt="volume" className={styles.note} />
        </div>

        <div className={styles.word_section}>
          <CircleList ansewerRigthCounter={ansewerRigthCounter} circle={CIRCLE} />

          <p className={styles.point_over}>+{POINT_INCREMENT_BY_LEVEL[pointsLevel]} за слово</p>

          <LevelIconList pointsLevel={pointsLevel} levels={POINT_INCREMENT_BY_LEVEL} />

          <p className={styles.word}>{!isLoading ? wordCurrent.word : null}</p>
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
        <Modal setIsModalVisible={setIsModalVisible}>
          <p>результаты игры</p>
          <Link to={ERoutes.games} className={styles.link}>
            Вернуться к выбору игры
          </Link>
          <Link
            onClick={() => {
              setIsModalVisible(false);
              refreshPage();
            }}
            className={styles.link}
            to={''}>
            Продолжить играть
          </Link>
        </Modal>
      )}
    </div>
  );
};
