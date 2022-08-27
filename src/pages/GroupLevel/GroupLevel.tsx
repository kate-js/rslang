import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LEVELS, UNITS } from '../../data/Data';
import styles from './GroupLevel.module.css';
import Book from './assets/book.png';
import Game1 from './assets/audio.png';
import Game2 from './assets/sprint.png';
import { Modal } from './Modal/Modal';
import { WordResponse } from '../../utils/constants';
import { api } from '../../utils/Api';

export const GroupLevel = () => {
  const [modal, setModal] = useState(false);
  const { level } = useParams<{ level: string }>();
  const [listWords, setListWords] = useState<Array<WordResponse>>([]);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [words, setWords] = useState<WordResponse>();

  useEffect(() => {
    const page = Number(JSON.parse(localStorage.getItem('numberPage') as string));
    setNumberPage(page);
  }, []);

  useEffect(() => {
    getWords();
  }, [numberPage]);

  function changeModal(item: WordResponse) {
    setModal(!modal);
    setWords(item);
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
      <Modal modal={modal} setModal={setModal} word={words} />
      <div>
        <Link to="/games/audio" className={styles.link}>
          <img src={Game1} alt="" className={styles.game_image} />
        </Link>
        <Link to="/games/sprint" className={styles.link}>
          <img src={Game2} alt="" className={styles.game_image} />
        </Link>
      </div>
    </div>
  );
};
