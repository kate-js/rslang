import { Link } from 'react-router-dom';
import { LEVELS_main } from '../../../data/Data';
import { ERoutes } from '../../../utils/constants';
import styles from './Levels.module.css';

export const Levels = () => {
  return (
    <>
      <ul className={styles.levels}>
        {LEVELS_main.map((item, index) => (
          <li key={index} value={item}>
            <Link to={`${ERoutes.tutorial}/${item}`} className={styles.link}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
