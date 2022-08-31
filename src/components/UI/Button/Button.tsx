import style from './Button.module.css';

type Props = {
  value: string;
  func: () => void;
};

export const Button = ({ value, func }: Props) => {
  return (
    <button className={style.button} onClick={func}>
      {value}
    </button>
  );
};
