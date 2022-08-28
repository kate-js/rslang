import { Description } from '../../../data/Data';
import styles from './LevelDescription.module.css';

export const LevelDescription = ({ level }: { level: number }) => {
  return (
    <div key={Description[level].id} className={styles.content}>
      <img src={Description[level].url} alt="image about English" className={styles.image} />
      <div className={styles.desc}>
        <h3>{Description[level].bigName}</h3>
        <p>{Description[level].description}</p>
      </div>
    </div>
  );
};
