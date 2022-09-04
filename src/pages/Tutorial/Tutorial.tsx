import { useState } from 'react';
import styles from './Tutorial.module.css';
import { LevelDescription } from './LevelDescription/LevelDescription';
import { LEVELS_main } from '../../data/Data';
import { Link } from 'react-router-dom';

export const Tutorial = () => {
  const [level, setLevel] = useState(0);

  localStorage.setItem('numberPage', '1');

  function updateLevel(index: number) {
    setLevel(index);
  }

  return (
    <div className={styles.tutorial}>
      <ul className={styles.levels}>
        {LEVELS_main.map((item, index) => (
          <li key={index} value={item} onMouseOver={() => updateLevel(index)}>
            <Link to={`./${item}`} className={styles.link}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <>
        <LevelDescription level={level} />
      </>
    </div>
  );
};
