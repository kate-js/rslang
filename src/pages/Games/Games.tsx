import { Link } from 'react-router-dom';
import styles from './Games.module.css'
import { LangLevel } from './LangLevel';
import { NewGame } from './NewGame';
import SprintImage from './assets/sprint.jpeg'
import AudioImage from './assets/audio.png'
import { ERoutes } from '../../utils/constants';

const data = [
  {
    id: 'level-1',
    descr: 'A1 - Beginner',
    value: '1',
  },
  {
    id: 'level-2',
    descr: 'A2 - Elementary',
    value: '2',
  },
  {
    id: 'level-3',
    descr: 'B1 - Intermediate' ,
    value: '3',
  },
  {
    id: 'level-4',
    descr: 'B2 - Upper Intermediate',
    value: '4',
  },
  {
    id: 'level-5',
    descr: 'C1 - Advanced',
    value: '5',
  },
  {
    id: 'level-6',
    descr: 'C2 - Proficiency',
    value: '6',
  }
]

export const Games = () => {

  return (
    <div className={styles.games}>

      <h1>Выбор игры</h1>
      <div className={styles.wrapper}>
        <Link to={`${ERoutes.games}${ERoutes.sprint}`}>
          <NewGame name='Спринт' img={SprintImage}/>
        </Link>

        <div className={styles.select_level}>
          {data.map((elem, index) => {
            return (
              <LangLevel key={index + 1} {...elem} />
            )
          })}
        </div>

        <Link to={`${ERoutes.games}${ERoutes.audio}`}>
          <NewGame name='Аудиовызов' img={AudioImage} />
        </Link>
      </div>
    </div>
  );
};
