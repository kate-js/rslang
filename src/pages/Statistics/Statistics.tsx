import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IOptional } from '../../api/apiConstants';
import { apiUsersStatistic } from '../../api/apiUsersStatistic';
import { TState } from '../../store/store';
import styles from './Statistics.module.css';

export const Statistics = () => {
  const [audio, setAudio] = useState<IOptional>();
  const [sprint, setSprint] = useState<IOptional>();
  const [total, setTotal] = useState<IOptional>();
  const userId = useSelector((state: TState) => state.auth.currentUser.userId);

  useEffect(() => {
    getStat();
  }, []);

  async function getStat() {
    try {
      const response = await apiUsersStatistic.getStatistics(userId);
      const { audio, sprint, total } = response.optional;
      setAudio(audio);
      setSprint(sprint);
      setTotal(total);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.statictics_section}>
      <h1 className={styles.Statistics_title}>Краткосрочная статистика</h1>
      <div className={styles.statictics_values}>
        <div className={styles.statictics_value}>
          <h3>Audio</h3>
          <ul className={styles.statictics_items}>
            <li className={styles.statictics_item}>
              <p>Количество новых слов за день</p>
              <div className={styles.statictics_title}>{audio?.learnNewWordPerDay[0].counter}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Процент правильных ответов</p>
              <div className={styles.statictics_title}>{audio?.percentRigth.right}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Самая длинная серия правильных ответов</p>
              <div className={styles.statictics_title}>{audio?.longestStrick}</div>
            </li>
          </ul>
        </div>
        <div className={styles.statictics_value}>
          <h3>Sprint</h3>
          <ul className={styles.statictics_items}>
            <li className={styles.statictics_item}>
              <p>Количество новых слов за день</p>
              <div className={styles.statictics_title}>{sprint?.learnNewWordPerDay[0].counter}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Процент правильных ответов</p>
              <div className={styles.statictics_title}>{sprint?.percentRigth.right}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Самая длинная серия правильных ответов</p>
              <div className={styles.statictics_title}>{sprint?.longestStrick}</div>
            </li>
          </ul>
        </div>
        <div className={styles.statictics_value}>
          <h3>Total</h3>
          <ul className={styles.statictics_items}>
            <li className={styles.statictics_item}>
              <p>Количество новых слов за день</p>
              <div className={styles.statictics_title}>{total?.learnNewWordPerDay[0].counter}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Процент правильных ответов</p>
              <div className={styles.statictics_title}>{total?.percentRigth.right}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Самая длинная серия правильных ответов</p>
              <div className={styles.statictics_title}>{total?.longestStrick}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
