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
            About us
          </Link>
        </li>
        <li>
          <Link to={ERoutes.games} className={styles.link}>
            Games
          </Link>
        </li>
        <li>
          <Link to={ERoutes.statistics} className={styles.link}>
            Statistics
          </Link>
        </li>
        <li>
          <Link to={ERoutes.tutorial} className={styles.link}>
            Tutorial
          </Link>
        </li>
      </ul>
    </nav>
  );
};
