import { Link } from 'react-router-dom';

export const Games = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/games/audio">Игра аудиовызов</Link>
        </li>
        <li>
          <Link to="/games/sprint">Игра спринт</Link>
        </li>
      </ul>
    </div>
  );
};
