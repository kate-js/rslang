import { Link, useNavigate } from 'react-router-dom';
import { ERoutes } from '../../utils/constants';
import { useEffect, useState } from 'react';

import styles from './Sprint.module.css';
import Close from './assets/close.png';
import Arrow from './assets/arrow.png';
import Love from './assets/love.png';
import Note from './assets/note.png';
import { Modal } from './Modal/Modal';

export const Sprint = () => {
  const [seconds, setSeconds] = useState(10);
  const [timerActive, setTimerActive] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
      setVisible(true);
    }
  }, [seconds, timerActive]);

  const handleKeyDown = (event: KeyboardEvent) => {
    event.key === 'ArrowLeft'
      ? console.log('Не верно')
      : event.key === 'ArrowRight'
      ? console.log('Верно')
      : console.log('Игнорим');
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.sprint} tabIndex={1}>
      <div className={styles.timer}>
        {seconds && timerActive ? (
          <div onClick={() => setTimerActive(!timerActive)} className={styles.timer_pause}>
            {seconds}
          </div>
        ) : seconds && !timerActive ? (
          <div onClick={() => setTimerActive(!timerActive)} className={styles.timer_pause}>
            ||
          </div>
        ) : (
          <Modal visible={visible}>
            <p>результаты игры</p>
            <Link to={ERoutes.games} className={styles.link}>
              Вернуться к выбору игры
            </Link>
            <Link
              onClick={() => {
                setVisible(false), refreshPage();
              }}
              className={styles.link}
              to={''}>
              Продолжить играть
            </Link>
          </Modal>
        )}
      </div>
      <div className={styles.main}>
        <div className={styles.counter_section}>
          <p className={styles.counter}>0</p>
          <img src={Note} alt="volume" className={styles.note} />
        </div>
        <div className={styles.word_section}>
          <div className={styles.circle_section}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
          </div>
          <p className={styles.point_over}>+80 за слово</p>
          <div className={styles.love_section}>
            <img src={Love} alt="love" />
            <img src={Love} alt="love" />
            <img src={Love} alt="love" />
            <img src={Love} alt="love" />
          </div>
          <p className={styles.word}>Слово</p>
          <p className={styles.translation}>Перевод</p>
          <div className={styles.button_section}>
            <button>Не верно</button>
            <button>Верно</button>
          </div>
          <div className={styles.arrow_section}>
            <img src={Arrow} alt="arrow-left" className={styles.arrow_left} />
            <img src={Arrow} alt="arrow-right" className={styles.arrow_right} />
          </div>
        </div>
      </div>
      <div className={styles.close_section}>
        <Link to={ERoutes.games} className={styles.link}>
          <img src={Close} alt="close" className={styles.close_button} />
        </Link>
      </div>
    </div>
  );
};
