import { cardTutorial } from '../../../utils/constants';
import styles from './Tutorial_description.module.css';

export const Tutorial_description = ({ id, bigName, url, description }: cardTutorial) => {
  return (
    <div key={id} className={styles.content}>
      <img src={url} alt="image about English" className={styles.image} />
      <div className={styles.desc}>
        <h3>{bigName}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
