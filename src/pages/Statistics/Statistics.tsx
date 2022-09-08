import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IOptional } from '../../api/apiConstants';
import { apiUsersStatistic } from '../../api/apiUsersStatistic';
import { TState } from '../../store/store';
import styles from './Statistics.module.css';

export const Statistics = () => {
  const [audio, setAudio] = useState<IOptional>();
  const [sprint, setSprint] = useState<IOptional>();
  const [audioDay, setAudioDay] = useState<number>();
  const [sprintDay, setSprintDay] = useState<number>();
  const [totalDay, setTotalDay] = useState<number>(0);
  const userId = useSelector((state: TState) => state.auth.currentUser.userId);

  useEffect(() => {
    getStat();
  }, []);

  const today = new Date();
  const date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

  async function getStat() {
    try {
      const response = await apiUsersStatistic.getStatistics(userId);
      const { audio, sprint } = response.optional;
      await setAudio(audio);
      await setSprint(sprint);

      const arr = sprint?.learnNewWordPerDay;
      arr.map((item, index) => {
        date == sprint?.learnNewWordPerDay[index].date;
        setSprintDay(sprint?.learnNewWordPerDay[index].counter);
        setTotalDay(
          sprint?.learnNewWordPerDay[index].counter + audio?.learnNewWordPerDay[index].counter
        );
      });
      const arr1 = audio?.learnNewWordPerDay;
      arr1.map((item, index) => {
        date == audio?.learnNewWordPerDay[index].date;
        setAudioDay(audio?.learnNewWordPerDay[index].counter);
      });
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
              <div className={styles.statictics_title}>{audioDay}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Процент правильных ответов</p>
              <div className={styles.statictics_title}>
                <div className={styles.statictics_title}>
                  {Math.round(
                    ((audio?.percentRigth.right as number) /
                      ((audio?.percentRigth.right as number) +
                        (audio?.percentRigth.wrong as number))) *
                      100
                  ) | 0}
                </div>
              </div>
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
              <div className={styles.statictics_title}>{sprintDay}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Процент правильных ответов</p>
              <div className={styles.statictics_title}>
                {Math.round(
                  ((sprint?.percentRigth.right as number) /
                    ((sprint?.percentRigth.right as number) +
                      (sprint?.percentRigth.wrong as number))) *
                    100
                ) | 0}
              </div>
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
              <div className={styles.statictics_title}>{totalDay}</div>
            </li>
            <li className={styles.statictics_item}>
              <p>Процент правильных ответов</p>
              <div className={styles.statictics_title}>
                {(Math.round(
                  (Math.round(
                    ((audio?.percentRigth.right as number) /
                      ((audio?.percentRigth.right as number) +
                        (audio?.percentRigth.wrong as number))) *
                      100
                  ) +
                    Math.round(
                      ((sprint?.percentRigth.right as number) /
                        ((sprint?.percentRigth.right as number) +
                          (sprint?.percentRigth.wrong as number))) *
                        100
                    )) /
                    2
                ) as number) | 0}
              </div>
            </li>
            <li className={styles.statictics_item}>
              <p>Самая длинная серия правильных ответов</p>
              <div className={styles.statictics_title}>
                {(sprint?.longestStrick as number) > (audio?.longestStrick as number)
                  ? sprint?.longestStrick
                  : audio?.longestStrick}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
