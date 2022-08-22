import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import { ERoutes } from '../../utils/constants';
import { useEffect, useState } from 'react';

import styles from './Sprint.module.css';
import Close from './assets/close.png';
import Arrow from './assets/arrow.png';
import Love from './assets/love.png';
import Note from './assets/note.png';

export const Sprint = () => {
  const [seconds, setSeconds] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);

  return (
    <div className={styles.sprint}>
      <div className={styles.timer}>
        {seconds && timerActive ? (
          <div onClick={() => setTimerActive(!timerActive)}>{seconds}</div>
        ) : seconds && !timerActive ? (
          <div onClick={() => setTimerActive(!timerActive)}>||</div>
        ) : (
          <div>Таймер</div>
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
            <Button value="Не верно" />
            <Button value="Верно" />
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
