import { UNITS } from '../../data/Data';
import styles from './GroupLevel.module.css';
import Book from './assets/English-book.webp';

const PAGE = [
  {
    id: 'string',
    group: 0,
    page: 0,
    word: 'string',
    image: 'string',
    audio: 'string',
    audioMeaning: 'string',
    audioExample: 'string',
    textMeaning: 'string',
    textExample: 'string',
    transcription: 'string',
    wordTranslate: 'string',
    textMeaningTranslate: 'string',
    textExampleTranslate: 'string'
  }
];

// https://<your-app-name>.herokuapp.com/words?page=2&group=0
export const GroupLevel = () => {
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <div className={styles.title_block}>
          <img src={Book} alt="book" className={styles.image} />
          <h3>Топ слов уроверь A1</h3>
        </div>
        <select className={styles.select}>
          {UNITS.map((number: number) => (
            <option key={number} value={number}>
              Page {number}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.wordList}>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
        <div className={styles.word}>Word</div>
      </div>
    </div>
  );
};
