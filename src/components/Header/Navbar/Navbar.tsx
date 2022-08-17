import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.link}>
            About us
          </Link>
        </li>
        <li>
          <Link to="/games" className={styles.link}>
            Games
          </Link>
        </li>
      </ul>
    </nav>
  );
};
