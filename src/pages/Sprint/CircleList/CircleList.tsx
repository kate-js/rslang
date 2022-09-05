import React from 'react';
import styles from './CircleList.module.css';

interface IProps {
  circle: number[];
  ansewerRigthCounter: number;
}

const CircleList = (props: IProps) => {
  return (
    <div className={styles.circle_section}>
      {props.circle.map((el) => {
        return (
          <div
            key={el}
            className={`${styles.circle} ${
              props.ansewerRigthCounter > el ? styles.circle_active : ''
            }`}></div>
        );
      })}
    </div>
  );
};

export default CircleList;
