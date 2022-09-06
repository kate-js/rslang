import { apiUsersStatistic } from '../../api/apiUsersStatistic';
import { IUserStatistics, initialUserStatistics, optionsDate } from '../../api/apiConstants';

export const getStatistics = async (userId: string) => {
  let stats = {} as IUserStatistics;
  try {
    stats = await apiUsersStatistic.getStatistics(userId);
  } catch (err) {
    console.log(err);
  }
  return stats;
};

export const sendStatistics = (
  userId: string,
  userStatistic: IUserStatistics,
  learnWordToday: number,
  answerCorrectLength: number,
  answerWrongLength: number,
  allStricks: number[]
) => {
  let newStatistics: IUserStatistics = userStatistic;
  const currentDate = new Date().toLocaleString('en-US', optionsDate);

  if (userStatistic?.optional) {
    // if statistics already exist

    // create learnNewWordToday
    const learnNewWordPerDay = newStatistics.optional.sprint.learnNewWordPerDay;
    const learnNewWordToday = learnNewWordPerDay[learnNewWordPerDay.length - 1];

    if (learnNewWordToday.date === currentDate) {
      learnNewWordToday.counter += learnWordToday;
    } else {
      learnNewWordPerDay.push({
        date: currentDate,
        counter: learnWordToday
      });
    }

    const percentRigth = newStatistics.optional.sprint.percentRigth;
    percentRigth.right = percentRigth.right + answerCorrectLength;
    percentRigth.wrong = percentRigth.wrong + answerWrongLength;

    const currentMaxStrick = Math.max(...allStricks);
    const serverMaxStrick = newStatistics.optional.sprint.longestStrick;
    const maxStrick = currentMaxStrick > serverMaxStrick ? currentMaxStrick : serverMaxStrick;
    newStatistics.optional.sprint.longestStrick = maxStrick;
  } else {
    newStatistics = initialUserStatistics;

    newStatistics.optional.sprint.learnNewWordPerDay[0].date = currentDate;
    newStatistics.optional.sprint.learnNewWordPerDay[0].counter += learnWordToday;

    const percentRigth = newStatistics.optional.sprint.percentRigth;
    percentRigth.right += answerCorrectLength;
    percentRigth.wrong += answerWrongLength;


    newStatistics.optional.sprint.longestStrick = Math.max(...allStricks);
  }

  try {
    apiUsersStatistic.setNewStatistics(userId, newStatistics);
  } catch (err) {
    console.log(err);
  }
};
