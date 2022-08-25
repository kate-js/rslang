import { fontPageTutorial } from '../../../data/Data';
import styles from './LevelDescription.module.css';

export const LevelDescription = ({ level }: { level: number }) => {
  return (
    <div key={fontPageTutorial[level].id} className={styles.content}>
      <img src={fontPageTutorial[level].url} alt="image about English" className={styles.image} />
      <div className={styles.desc}>
        <h3>{fontPageTutorial[level].bigName}</h3>
        <p>{fontPageTutorial[level].description}</p>
      </div>
    </div>
  );
};
