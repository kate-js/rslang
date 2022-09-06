import { useDispatch } from 'react-redux';
import { setLevel, setIsFromTutorial } from '../../store/levelChoseSlice';
import { Link } from 'react-router-dom';
import styles from './Games.module.css';
import { LangLevel } from './LangLevel';
import { NewGame } from './NewGame';
import SprintImage from './assets/sprint.jpeg';
import AudioImage from './assets/audio.png';
import { ERoutes } from '../../utils/constants';
import { useEffect } from 'react';

const data = [
  {
    id: 'level-1',
    descr: 'A1 - Beginner',
    value: 'A1'
  },
  {
    id: 'level-2',
    descr: 'A2 - Elementary',
    value: 'A2'
  },
  {
    id: 'level-3',
    descr: 'B1 - Intermediate',
    value: 'B1'
  },
  {
    id: 'level-4',
    descr: 'B2 - Upper Intermediate',
    value: 'B2'
  },
  {
    id: 'level-5',
    descr: 'C1 - Advanced',
    value: 'C1'
  },
  {
    id: 'level-6',
    descr: 'C2 - Proficiency',
    value: 'C2'
  }
];

export const Games = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsFromTutorial(false));
  })

  const handelLevelChose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let level;
    if (e.target instanceof HTMLInputElement) {
      level = e.target.value;
      dispatch(setLevel(level));
    }
  };

  const handelGameClick = () => {
    dispatch(setIsFromTutorial(false));
  };

  return (
    <div className={styles.games}>
      <h1>Выбор игры</h1>
      <div className={styles.wrapper}>
        <Link to={`${ERoutes.games}${ERoutes.sprint}`} onClick={handelGameClick}>
          <NewGame name="Спринт" img={SprintImage} />
        </Link>

        <div className={styles.select_level} onClick={handelLevelChose}>
          {data.map((elem, index) => {
            return <LangLevel key={index + 1} {...elem} />;
          })}
        </div>

        <Link to={`${ERoutes.games}${ERoutes.audio}`} onClick={handelGameClick}>
          <NewGame name="Аудиовызов" img={AudioImage} />
        </Link>
      </div>
    </div>
  );
};
