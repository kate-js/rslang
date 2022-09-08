import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { ERoutes } from '../../../utils/constants';

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.link_list}>
        <li>
          <Link to={ERoutes.home} className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to={ERoutes.about} className={styles.link}>
            О команде
          </Link>
        </li>
        <li>
          <Link to={ERoutes.games} className={styles.link}>
            Игры
          </Link>
        </li>
        <li>
          <Link to={ERoutes.statistics} className={styles.link}>
            Статистика
          </Link>
        </li>
        <li>
          <Link to={ERoutes.tutorial} className={styles.link}>
            Учебник
          </Link>
        </li>
      </ul>
    </nav>
  );
};
