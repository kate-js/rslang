import { UNITS } from '../../data/Data';
import styles from './GroupLevel.module.css';
import Book from './assets/English-book.webp';
import { useState } from 'react';
import { Modal } from './Modal/Modal';

export const GroupLevel = () => {
  const [modal, setModal] = useState(false);

  function changeModal() {
    setModal(!modal);
  }

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
      <Modal modal={modal} setModal={setModal} />
      <div className={styles.wordList}>
        <div className={styles.word} onClick={changeModal}>
          Word1
        </div>
        <div className={styles.word}>Word2</div>
        <div className={styles.word}>Word3</div>
        <div className={styles.word}>Word4</div>
        <div className={styles.word}>Word5</div>
        <div className={styles.word}>Word6</div>
        <div className={styles.word}>Word7</div>
        <div className={styles.word}>Word8</div>
        <div className={styles.word}>Word9</div>
        <div className={styles.word}>Word10</div>
        <div className={styles.word}>Word11</div>
        <div className={styles.word}>Word12</div>
        <div className={styles.word}>Word13</div>
        <div className={styles.word}>Word14</div>
        <div className={styles.word}>Word15</div>
        <div className={styles.word}>Word16</div>
        <div className={styles.word}>Word17</div>
        <div className={styles.word}>Word18</div>
        <div className={styles.word}>Word19</div>
        <div className={styles.word}>Word20</div>
      </div>
    </div>
  );
};
