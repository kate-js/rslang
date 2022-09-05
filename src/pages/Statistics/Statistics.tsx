import { useState } from 'react';
import { Statistics_title } from '../../data/Data';
import styles from './Statistics.module.css';
import { StatValue } from './StatValue/StatValue';

export const Statistics = () => {
  const [item, setItem] = useState('Audio');

  function changeItem(item: string) {
    setItem(item);
  }

  return (
    <div className={styles.statictics_section}>
      <h1>Краткосрочная статистика</h1>
      <ul className={styles.statictics_titles}>
        {Statistics_title.map((item, index) => (
          <li className={styles.statictics_title} key={index} onClick={() => changeItem(item)}>
            {item}
          </li>
        ))}
      </ul>
      <StatValue item={item} />
    </div>
  );
};
