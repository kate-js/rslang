import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LEVELS, UNITS } from '../../data/Data';
import styles from './GroupLevel.module.css';
import Book from './assets/book.png';
import { Modal } from './Modal/Modal';
import { WordResponse } from '../../utils/constants';
import { api } from '../../utils/Api';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from '../../store/store';
import { GameLinks } from '../../components/GameLinks/GameLinks';
import { setLevel, setPage } from './GroupPage';

export const GroupLevel = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { level } = useParams<{ level: string }>();
  const [listWords, setListWords] = useState<WordResponse[]>([]);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [words, setWords] = useState<WordResponse>();

  const isLodined = useSelector((state: TState) => state.auth.isLogined);
  const token: string = useSelector((state: TState) => state.auth.currentUser.token);
  const userId: string = useSelector((state: TState) => state.auth.currentUser.userId);

  dispatch(setLevel(level));

  useEffect(() => {
    level !== 'HARD WORDS' ? getLocaleNumberPage() : getHardWords();
  }, []);

  useEffect(() => {
    level === 'HARD WORDS' ? getHardWords() : null;
  }, [modal]);

  function getLocaleNumberPage() {
    const page = Number(JSON.parse(localStorage.getItem('numberPage') as string));
    setNumberPage(page);
    dispatch(setPage(page));
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
      await setListWords(response);
    } catch (error) {
      console.error(error);
    }
  }

  function getPage(e: React.ChangeEvent<HTMLSelectElement>) {
    const page = Number(e.target.value);
    setNumberPage(page);
    dispatch(setPage(page));
    localStorage.setItem('numberPage', JSON.stringify(page));
  }

  function getStyle(elem: WordResponse) {
    if (elem.userWord?.difficulty === 'hard' && elem.userWord?.optional?.learningWord) {
      return styles.wordVeryHard;
    } else if (elem.userWord?.difficulty === 'hard') {
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
        isLodined ? (
          <>
            <div className={styles.title}>
              <div className={styles.title_block}>
                <img src={Book} alt="book" className={styles.image} />
                <h3>{level}</h3>
              </div>
            </div>
            <ul className={styles.wordList}>
              {listWords.map((item, index) => (
                <li className={getStyle(item)} onClick={() => changeModal(item)} key={index}>
                  {item.word}
                </li>
              ))}
            </ul>
            <Modal modal={modal} setModal={setModal} word={words} changeModal={changeModal} />
            <GameLinks />
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
              <h3>Топ слов уроверь {level}</h3>
            </div>
            <select className={styles.select} onChange={getPage} value={numberPage}>
              {UNITS.map((number: number) => (
                <option key={number} value={number}>
                  Page {number}
                </option>
              ))}
            </select>
          </div>
          <ul className={styles.wordList}>
            {listWords.map((item, index) => (
              <li className={getStyle(item)} onClick={() => changeModal(item)} key={index}>
                {item.word}
              </li>
            ))}
          </ul>
          <Modal modal={modal} setModal={setModal} word={words} changeModal={changeModal} />
          <GameLinks />
        </>
      )}
    </div>
  );
};
