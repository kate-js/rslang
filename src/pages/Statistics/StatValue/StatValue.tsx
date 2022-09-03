import { useEffect, useState } from 'react';
import { api } from '../../../utils/Api';
import styles from './Stat.value.module.css';

export const StatValue = ({ item }: { item: string }) => {
  const [countDay, setCountDay] = useState();

  useEffect(() => {
    getStat();
  }, []);

  async function getStat() {
    const userId = '630b42ce0957770016b4bca1';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGI0MmNlMDk1Nzc3MDAxNmI0YmNhMSIsImlhdCI6MTY2MjE5NzgwOCwiZXhwIjoxNjYyMjEyMjA4fQ.q4TFZkfKGaJI7cMI0-l0oGk0meV40UX8-P5f7YwzMXI';
    try {
      const response = await api.getStatistics({ userId, token, item });
      console.log(response);
      setCountDay(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ul className={styles.statictics_items}>
        <li className={styles.statictics_item}>
          <p>Количество новых слов за день</p>
          <div className={styles.statictics_title}>{countDay}</div>
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
    </>
  );
};
