import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Timer.module.css';

interface IProps {
  setIsModalVisible: (flag: boolean) => void;
  isModalVisible: boolean;
}

const Timer = ({ setIsModalVisible, isModalVisible }: IProps) => {
  const [seconds, setSeconds] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // timer functionality
  const toggleTimer = () => {
    setIsTimerActive((prev) => !prev);
  };

  useEffect(() => {
    if (seconds > 0 && isTimerActive && !isModalVisible) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else if (!seconds) {
      setIsTimerActive(false);
      setIsModalVisible(true);
    }
  }, [seconds, isTimerActive]);

  return (
    <div className={styles.timer}>
      {seconds && isTimerActive ? (
        <div onClick={toggleTimer} className={styles.timer_pause}>
          {seconds}
        </div>
      ) : (
        <div onClick={toggleTimer} className={styles.timer_pause}>
          ||
        </div>
      )}
    </div>
  );
};

export default Timer;
