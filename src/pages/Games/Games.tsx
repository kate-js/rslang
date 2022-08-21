import { Link } from 'react-router-dom';
import styles from './Games.module.css'
import { LangLevel } from './LangLevel';
import { NewGame } from './NewGame';
import SprintImage from './assets/sprint.jpeg'
import AudioImage from './assets/audio.png'
import { ERoutes } from '../../utils/constants';
import { useState } from 'react';

export const Games = () => {
  const [level, setLevel] = useState('1');

  function onInputChange({target}) {  
    setLevel(target.value);
    console.log(level)
  }

  return (
    <div className={styles.games}>
      <Link to={`${ERoutes.games}${ERoutes.audio}`}>
        <NewGame name='Спринт' img={SprintImage}/>
      </Link>

      <Link to={`${ERoutes.games}${ERoutes.sprint}`}>
        <NewGame name='Аудиовызов' img={AudioImage} />
      </Link>

      <div className={styles.select_level}>
        <LangLevel id='level-1' descr='A1 - Beginner' value='1' onChange={onInputChange} />
        <LangLevel id='level-2' descr='A2 - Elementary' value='2' onChange={onInputChange} />
        <LangLevel id='level-3' descr='B1 - Intermediate' value='3' onChange={onInputChange} />
        <LangLevel id='level-4' descr='B2 - Upper Intermediate' value='4' onChange={onInputChange} />
        <LangLevel id='level-5' descr='C1 - Advanced' value='5' onChange={onInputChange} />
        <LangLevel id='level-6' descr='C2 - Proficiency' value='6' onChange={onInputChange} />
      </div>
    </div>
  );
};
