import { Link } from 'react-router-dom';
import Game1 from './assets/audio.png';
import Game2 from './assets/sprint.png';
import styles from './GameLinks.module.css';

export const GameLinks = () => {
  return (
    <div>
      <Link to="/games/audio">
        <img src={Game1} alt="" className={styles.game_image} />
      </Link>
      <Link to="/games/sprint">
        <img src={Game2} alt="" className={styles.game_image} />
      </Link>
    </div>
  );
};
