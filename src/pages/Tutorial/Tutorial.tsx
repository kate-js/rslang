import { useEffect, useState } from 'react';
import styles from './Tutorial.module.css';
import A1 from './assets/A1.png';
import A2 from './assets/A2.png';
import C1 from './assets/C1.png';
import C2 from './assets/C2.png';
import B1 from './assets/B1.png';
import B2 from './assets/B2.png';
import { MouseEvent } from 'react';

export const Tutorial = () => {
  const [level, setLevel] = useState('A1');
  const [url, setUrl] = useState(A1);

  function asd(event: MouseEvent) {
    const level = (event.target as HTMLElement).innerHTML;
    setLevel(level);
  }

  useEffect(() => {
    level.toString() == 'A1'
      ? setUrl(A1)
      : level.toString() == 'A2'
      ? setUrl(A2)
      : level.toString() == 'B1'
      ? setUrl(B1)
      : level.toString() == 'B2'
      ? setUrl(B2)
      : level.toString() == 'C1'
      ? setUrl(C1)
      : setUrl(C2);
  }, [level]);

  return (
    <div className={styles.tutorial}>
      <ul className={styles.levels}>
        <li onMouseOver={asd}>A1</li>
        <li onMouseOver={asd}>A2</li>
        <li onMouseOver={asd}>B1</li>
        <li onMouseOver={asd}>B2</li>
        <li onMouseOver={asd}>C1</li>
        <li onMouseOver={asd}>C2</li>
      </ul>
      <img src={url} alt="image with students" className={styles.image} />
      <p></p>
    </div>
  );
};
