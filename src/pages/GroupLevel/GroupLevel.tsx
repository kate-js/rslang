import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LEVELS, UNITS } from '../../data/Data';
import styles from './GroupLevel.module.css';
import Book from './assets/book.png';
import { Modal } from './Modal/Modal';
import { WordResponse } from '../../utils/constants';
import { api } from '../../utils/Api';
import { useSelector } from 'react-redux';
import { TState } from '../../store/store';
import { GameLinks } from '../../components/GameLinks/GameLinks';

export const GroupLevel = () => {
  const [modal, setModal] = useState(false);
  const { level } = useParams<{ level: string }>();
  const [listWords, setListWords] = useState<WordResponse[]>([]);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [words, setWords] = useState<WordResponse>();
  const [hard, setHard] = useState<boolean>();
  const [learn, setLearn] = useState<boolean>();

  const isLodined = useSelector((state: TState) => state.auth.isLogined);
  const token: string = useSelector((state: TState) => state.auth.currentUser.token);
  const userId: string = useSelector((state: TState) => state.auth.currentUser.userId);

  useEffect(() => {
    level !== 'HARD WORDS' ? getLocaleNumberPage() : getHardWords();
  }, []);

  useEffect(() => {
    level === 'HARD WORDS' ? getHardWords() : null;
  }, [modal]);

  function getLocaleNumberPage() {
    const page = Number(JSON.parse(localStorage.getItem('numberPage') as string));
    setNumberPage(page);
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
    getWords();
  }, [numberPage]);

  async function changeModal(item: WordResponse) {
    const value = item._id || item.id;
    await getWordInfo(value);
    setModal(!modal);
    setWords(item);
  }

  async function getWordInfo(wordId: string) {
    const [difficulty, learningWord] = await api.getWordInfo({ userId, token, wordId });
    setHard(difficulty);
    setLearn(learningWord);
  }

  async function getWords() {
    if (!level) {
      return;
    }

    const group = LEVELS[level as keyof typeof LEVELS];

    try {
      const response = await api.getWords({ group, numberPage });
      await setListWords(response);
    } catch (error) {
      console.error(error);
    }
  }

  function getPage(e: React.ChangeEvent<HTMLSelectElement>) {
    const page = Number(e.target.value);
    setNumberPage(page);
    localStorage.setItem('numberPage', JSON.stringify(page));
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
                <li className={styles.word} onClick={() => changeModal(item)} key={index}>
                  {item.word}
                </li>
              ))}
            </ul>
            <Modal
              modal={modal}
              setModal={setModal}
              word={words}
              hard={hard}
              learn={learn}
              setHard={setHard}
              setLearn={setLearn}
            />
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
            {listWords.map((item) => (
              <li className={styles.word} onClick={() => changeModal(item)} key={item.id}>
                {item.word}
              </li>
            ))}
          </ul>
          <Modal
            modal={modal}
            setModal={setModal}
            word={words}
            hard={hard}
            learn={learn}
            setHard={setHard}
            setLearn={setLearn}
          />
          <GameLinks />
        </>
      )}
    </div>
  );
};
