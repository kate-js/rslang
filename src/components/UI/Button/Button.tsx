import style from './Button.module.css';

type Props = {
  value: string;
};

export const Button = ({ value }: Props) => {
  return <button className={style.button}>{value}</button>;
};
