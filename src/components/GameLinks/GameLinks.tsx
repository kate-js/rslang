import { Link } from 'react-router-dom';
import Game1 from './assets/audio.png';
import Game2 from './assets/sprint.png';
import styles from './GameLinks.module.css';

export const GameLinks = ({ learnPage }: { learnPage: boolean }) => {
  let style: string;
  if (learnPage) {
    style = styles.disabled;
  }

  const data = [
    { name: 'Играть в Aудио', link: Game1, alt: 'Audio', to: '/games/audio' },
    { name: 'Играть в Спринт', link: Game2, alt: 'Sprint', to: '/games/sprint' }
  ];

  return (
    <div className={styles.game_section}>
      {data.map((game, index) => (
        <Link to={game.to} className={style} key={index}>
          <div className={learnPage ? styles.game_image_disabled : styles.game_item} key={index}>
            <p>{game.name}</p>
            <img
              src={game.link}
              alt="`image-link to game ${game.alt}`"
              className={styles.game_image}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
