import React from 'react';
import style from './Button.module.css';

export const Button = (props: { value: string }) => {
  console.log(props.value);
  return <button className={style.button}>{props.value}</button>;
};
