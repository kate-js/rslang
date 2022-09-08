import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LEVELS, UNITS } from '../../data/Data';
import styles from './GroupLevel.module.css';
import Book from './assets/book.png';
import { Modal } from './Modal/Modal';
import { WordResponse } from '../../utils/constants';
import { api } from '../../utils/Api';
import { TState } from '../../store/store';
import { GameLinks } from '../../components/GameLinks/GameLinks';
import { Levels } from '../Tutorial/Levels/Levels';
import { setIsFromTutorial, setLevel, setPage } from '../../store/levelChoseSlice';
import { apiAggregatedWords } from '../../api/apiUsersAggregatedWords';
import { WordWithDataResponse } from '../../api/apiConstants';

export const GroupLevel = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { level } = useParams<{ level: string }>();
  const [listWords, setListWords] = useState<WordResponse[] | WordResponse[]>([]);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [words, setWords] = useState<WordResponse>();
  const [learnPage, setLearnPage] = useState<boolean>(false);

  const isLogined = useSelector((state: TState) => state.auth.isLogined);
  const token: string = useSelector((state: TState) => state.auth.currentUser.token);
  const userId: string = useSelector((state: TState) => state.auth.currentUser.userId);

  useEffect(() => {
    dispatch(setIsFromTutorial(true));
    level !== 'HARD WORDS' ? getLocaleNumberPage() : getHardWords();
  }, []);

  useEffect(() => {
    localStorage.setItem('numberPage', '1');
    level !== 'HARD WORDS' ? getWords(userId, token) : getHardWords();
  }, [level]);

  useEffect(() => {
    level === 'HARD WORDS' ? getHardWords() : null;
  }, [modal]);

  function getLocaleNumberPage() {
    const page = Number(JSON.parse(localStorage.getItem('numberPage') as string));
    setNumberPage(page);
    dispatch(setPage(page));
    dispatch(setLevel(level));
  }

  async function getHardWords() {
    try {
      const response: WordResponse[] = await api.getHardWords({ userId, token });
      setListWords(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWords(userId, token);
  }, [numberPage, modal]);

  async function changeModal(item: WordResponse) {
    setModal(!modal);
    setWords(item);
  }

  async function getWords(userId: string, token: string) {
    if (!level) {
      return;
    }

    const group = LEVELS[level as keyof typeof LEVELS];

    try {
      const response = await api.fetchWords({ userId, token, group, numberPage });
      // console.log(response)

      setListWords(response);
      checkLearning(response);

    } catch (error) {
      console.error(error);
    }
  }

  function checkLearning(list: WordResponse[]) {
    let counter = 0;
    for (const key of list) {
      key.userWord?.optional?.learningWord ? counter++ : null;
    }
    counter !== 20 ? setLearnPage(false) : setLearnPage(true);
  }

  function getPage(e: React.ChangeEvent<HTMLSelectElement>) {
    const page = Number(e.target.value);
    setNumberPage(page);
    dispatch(setPage(page));
    localStorage.setItem('numberPage', JSON.stringify(page));
  }

  function getStyle(elem: WordResponse) {
    if (elem.userWord?.difficulty === 'hard') {
      return styles.wordHard;
    } else if (elem.userWord?.optional?.learningWord) {
      return styles.wordLearn;
    } else {
      return styles.word;
    }
  }

  return (
    <div className={styles.page}>
      {level == 'HARD WORDS' ? (
        isLogined ? (
          <>
            <div className={styles.title}>
              <div className={styles.title_block}>
                <img src={Book} alt="book" className={styles.image} />
                <h3>{level}</h3>
              </div>
            </div>
            {listWords.length ? (
              <ul className={styles.wordList}>
                {listWords.map((item, index) => {
                  const answers = item.userWord?.optional?.answerOrder?.answerArray || [];

                  return (
                    <li className={getStyle(item)} onClick={() => changeModal(item)} key={index}>
                      <div className={styles.answers}>
                        <div>{item.word}</div>
                        <div className={styles.answers__wrapper}>
                          {answers.map((value) =>
                            value ? (
                              <div className={styles.answer_correct}>v</div>
                            ) : (
                              <div className={styles.answer_incorrect}>x</div>
                            )
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className={styles.no_wordList}>У вас нет слов, отмеченных как сложное!</div>
            )}
            <Modal modal={modal} setModal={setModal} word={words} changeModal={changeModal} />
            <GameLinks learnPage={learnPage} />
            <div className={styles.levels_group}>
              <p>Сложно? Или слишком easy? Меняй уровень прямо сейчас!</p>
              <Levels />
            </div>
          </>
        ) : (
          <div className={styles.no_regictration}>
            Вам необходимо зарегистироваться, чтобы получить доступ к данному разделу!
          </div>
        )
      ) : (
        <>
          <div className={styles.title}>
            <div className={styles.title_block}>
              <img src={Book} alt="book" className={styles.image} />
              <h3
                style={{
                  color: `#${Math.floor(Math.random() * 8)}8${Math.floor(
                    Math.random() * 8
                  )}00${Math.floor(Math.random() * 8)}`
                }}>
                Топ слов уроверь {level}
              </h3>
            </div>
            <select className={styles.select} onChange={getPage} value={numberPage}>
              {UNITS.map((number: number) => (
                <option key={number} value={number}>
                  Page {number}
                </option>
              ))}
            </select>
          </div>
          <ul className={learnPage ? styles.wordListLearn : styles.wordList}>
            {listWords.map((item, index) => {
              const answers = item.userWord?.optional?.answerOrder?.answerArray || [];

              return (
                <li className={getStyle(item)} onClick={() => changeModal(item)} key={index}>
                  <div className={styles.answers}>
                    <div>{item.word}</div>
                    <div className={styles.answers__wrapper}>
                      {answers.map((value) =>
                        value ? (
                          <div className={styles.answer_correct}>v</div>
                        ) : (
                          <div className={styles.answer_incorrect}>x</div>
                        )
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Modal modal={modal} setModal={setModal} word={words} changeModal={changeModal} />
          <GameLinks learnPage={learnPage} />
          <div className={styles.levels_group}>
            <p>Сложно? Или слишком easy? Меняй уровень прямо сейчас!</p>
            <Levels />
          </div>
        </>
      )}
    </div>
  );
};
