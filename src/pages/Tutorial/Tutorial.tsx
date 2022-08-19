import { useState } from 'react';
import styles from './Tutorial.module.css';
import { MouseEvent } from 'react';
import { Tutorial_description } from './Tutorial.description.tsx/Tutorial_description';
import { cardTutorial, ERoutes } from '../../utils/constants';
import { fontPageTutorial } from '../../data/Data';
import { Link } from 'react-router-dom';

export const Tutorial = () => {
  const [level, setLevel] = useState('A1');

  function asd(event: MouseEvent) {
    const level = (event.target as HTMLElement).innerHTML;
    setLevel(level);
  }

  return (
    <div className={styles.tutorial}>
      <ul className={styles.levels}>
        <li>
          <Link to={ERoutes.home} className={styles.link} onMouseOver={asd}>
            A1
          </Link>
        </li>
        <li>
          <Link to={ERoutes.home} className={styles.link} onMouseOver={asd}>
            A2
          </Link>
        </li>
        <li>
          <Link to={ERoutes.home} className={styles.link} onMouseOver={asd}>
            B1
          </Link>
        </li>
        <li>
          <Link to={ERoutes.home} className={styles.link} onMouseOver={asd}>
            B2
          </Link>
        </li>
        <li>
          <Link to={ERoutes.home} className={styles.link} onMouseOver={asd}>
            C1
          </Link>
        </li>
        <li>
          <Link to={ERoutes.home} className={styles.link} onMouseOver={asd}>
            C2
          </Link>
        </li>
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
