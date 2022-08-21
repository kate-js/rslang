import styles from './LangLevel.module.css'

type LevelData = {
  id: string,
  descr: string,
  value: string,
  onChange({ target }: {
    target: HTMLInputElement;
  }): void
}

export const LangLevel = ({id, descr, value, onChange}: LevelData) => {
  return (
      <div className={styles.btn}>
        <input 
          type="radio" 
          name='select-level' 
          id={id}
          value={value}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor={id}>{descr}</label>
      </div>
  );
};

