import React from 'react';
import { Link } from 'react-router-dom';
import { LEVELS_main } from '../../../data/Data';
import styles from '../Tutorial.module.css';

interface PopupProps {
  updateLevel: (index: number) => void;
}

export const Levels = ({ updateLevel }: PopupProps) => {
  return (
    <>
      <ul className={styles.levels}>
        {LEVELS_main.map((item, index) => (
          <li key={index} value={item} onMouseOver={() => updateLevel(index)}>
            <Link to={`./${item}`} className={styles.link}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
