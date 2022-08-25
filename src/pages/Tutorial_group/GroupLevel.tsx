import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LEVELS, UNITS } from '../../data/Data';
import styles from './GroupLevel.module.css';
import Book from './assets/English-book.webp';
import { Modal } from './Modal/Modal';
import { IResponse } from '../../utils/constants';

export const GroupLevel = () => {
  const [modal, setModal] = useState(false);
  const { level } = useParams<{ level: string }>();
  const [listWords, setListWords] = useState<Array<IResponse>>([]);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [words, setWords] = useState<IResponse>({});

  function changeModal(item: IResponse) {
    setModal(!modal);
    setWords(item);
  }

  useEffect(() => {
    getWords();
  }, [numberPage]);

  async function getWords() {
    try {
      const response = await axios.get(
        `https://react-learnwords-example.herokuapp.com/words?group=${LEVELS[level]}&page=${numberPage}`
      );
      setListWords(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function getPage(e: React.ChangeEvent<HTMLSelectElement>) {
    const page = Number(e.target.value);
    setNumberPage(page);
  }

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <div className={styles.title_block}>
          <img src={Book} alt="book" className={styles.image} />
          <h3>Топ слов уроверь {level}</h3>
        </div>
        <select className={styles.select} onChange={getPage}>
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
          <img src={Book} alt="" className={styles.game_image} />
        </Link>
        <Link to="/games/sprint" className={styles.link}>
          <img src={Book} alt="" className={styles.game_image} />
        </Link>
      </div>
    </div>
  );
};
