import { useState } from 'react';
import styles from './Tutorial.module.css';
import { MouseEvent } from 'react';
import { Tutorial_description } from './Tutorial.description.tsx/Tutorial_description';
import { cardTutorial } from '../../utils/constants';
import { fontPageTutorial } from '../../data/Data';
import { Link } from 'react-router-dom';

export const Tutorial = () => {
  const [level, setLevel] = useState('A1');
  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  function updateLevel(event: MouseEvent) {
    const level = (event.target as HTMLElement).innerHTML;
    setLevel(level);
  }

  return (
    <div className={styles.tutorial}>
      <ul className={styles.levels}>
        {LEVELS.map((item) => (
          <li>
            <Link to="./tutorial/grouplevel" className={styles.link} onMouseOver={updateLevel}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <>
        {fontPageTutorial.map((item: cardTutorial) =>
          item.name === level ? (
            <Tutorial_description
              key={item.id}
              id={item.id}
              name={item.name}
              bigName={item.bigName}
              url={item.url}
              description={item.description}
            />
          ) : (
            console.log('fvev')
          )
        )}
      </>
    </div>
  );
};
