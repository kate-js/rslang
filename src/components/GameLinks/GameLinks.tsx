import { Link } from 'react-router-dom';
import Game1 from './assets/audio.png';
import Game2 from './assets/sprint.png';
import styles from './GameLinks.module.css';

export const GameLinks = ({ learnPage }: { learnPage: boolean }) => {
  let style;
  if (learnPage) {
    style = styles.disabled;
  }

  return (
    <div className={styles.game_section}>
      <div className={learnPage ? styles.game_image_disabled : styles.game_item}>
        <p>Играть в Aудио</p>
        <Link to="/games/audio" className={style}>
          <img src={Game1} alt="image-link to game Audio" className={styles.game_image} />
        </Link>
      </div>
      <div className={learnPage ? styles.game_image_disabled : styles.game_item}>
        <p>Играть в Спринт</p>
        <Link to="/games/sprint" className={style}>
          <img src={Game2} alt="image-link to game Sprint" className={styles.game_image} />
        </Link>
      </div>
    </div>
  );
};
