import { useState } from 'react';
import styles from './Tutorial.module.css';
import { MouseEvent } from 'react';
import { Tutorial_description } from './Tutorial.description.tsx/Tutorial_description';
import { cardTutorial } from '../../utils/constants';
import { fontPageTutorial, LEVELS_main } from '../../data/Data';
import { Link } from 'react-router-dom';

export const Tutorial = () => {
  const [level, setLevel] = useState('A1');

  function updateLevel(event: MouseEvent) {
    const level = (event.target as HTMLElement).innerHTML;
    setLevel(level);
  }

  return (
    <div className={styles.tutorial}>
      <ul className={styles.levels}>
        {LEVELS_main.map((item, index) => (
          <li key={index}>
            <Link to={`./${item}`} className={styles.link} onMouseOver={updateLevel}>
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
