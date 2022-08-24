import styles from './LangLevel.module.css'

type LevelData = {
  id: string,
  descr: string,
  value: string,
}

export const LangLevel = ({id, descr, value}: LevelData) => {
  return (
      <div className={styles.btn}>
        <input 
          type="radio" 
          name='select-level' 
          id={id}
          value={value}
        />
        <label htmlFor={id}>{descr}</label>
      </div>
  );
};

