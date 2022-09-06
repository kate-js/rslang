import styles from './NewGame.module.css';

export const NewGame = ({ name, img }: { name: string; img: string }) => {
  return (
    <div className={styles.game}>
      <h1>{name}</h1>
      <img src={img} alt="Game Image" className={styles.image} />
    </div>
  );
};
