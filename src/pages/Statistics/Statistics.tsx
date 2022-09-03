import { Statistics_title } from '../../data/Data';
import styles from './Statistics.module.css';

export const Statistics = () => {
  return (
    <div className={styles.statictics_section}>
      <h1>Краткосрочная статистика</h1>
      <ul className={styles.statictics_titles}>
        {Statistics_title.map((item, index) => (
          <li className={styles.statictics_title} key={index}>
            {item}
          </li>
        ))}
      </ul>
      <ul className={styles.statictics_items}>
        <li className={styles.statictics_item}>
          <p>Количество новых слов за день</p>
          <div className={styles.statictics_title}>19</div>
        </li>
        <li className={styles.statictics_item}>
          <p>Процент правильных ответов</p>
          <div className={styles.statictics_title}>20</div>
        </li>
        <li className={styles.statictics_item}>
          <p>Самая длинная серия правильных ответов</p>
          <div className={styles.statictics_title}>21</div>
        </li>
      </ul>
    </div>
  );
};
