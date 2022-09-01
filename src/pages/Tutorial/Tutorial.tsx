import { useState } from 'react';
import styles from './Tutorial.module.css';
import { LevelDescription } from './LevelDescription/LevelDescription';
import { Levels } from './Levels/Levels';

export const Tutorial = () => {
  const [level, setLevel] = useState(0);

  localStorage.setItem('numberPage', '1');

  function updateLevel(index: number) {
    setLevel(index);
  }

  return (
    <div className={styles.tutorial}>
      <Levels updateLevel={updateLevel} />
      <>
        <LevelDescription level={level} />
      </>
    </div>
  );
};
