import React from 'react';
import styles from './LevelIconList.module.css';
import iconLove from '../assets/love.png';

interface IProps {
  levels: number[];
  pointsLevel: number;
}

const LevelIconList = (props: IProps) => {
  return (
    <div className={styles.level_section}>
      {props.levels.map((el, idx) => {
        return (
          <img
            key={el}
            className={`${styles.level_icon} ${
              props.pointsLevel >= idx ? styles.level_icon_active : ''
            }`}
            src={iconLove}
            alt="love"
          />
        );
      })}
    </div>
  );
};

export default LevelIconList;
