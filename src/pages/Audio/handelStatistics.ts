import { apiUsersStatistic } from '../../api/apiUsersStatistic';
import { IUserStatistics, initialUserStatistics, optionsDate } from '../../api/apiConstants';

export const getStatistics = async (userId: string) => {
  let stats = {} as IUserStatistics;
  try {
    stats = await apiUsersStatistic.getStatistics(userId);
  } catch (err) {
    console.log(err);
  }
  console.log(stats);
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
  let newStatistics: IUserStatistics = {...userStatistic};
  const currentDate = new Date().toLocaleString('en-US', optionsDate);

  if (userStatistic?.optional) {
    // if statistics already exist

    // create learnNewWordToday
    const serverNewWordPerDay = userStatistic.optional.audio.learnNewWordPerDay;
    let newObj = serverNewWordPerDay.pop();

    if (newObj?.date === currentDate) {
      newObj.counter += learnWordToday;
      console.log('after',{
        date: newObj.date,
        counter: newObj.counter
      })
      serverNewWordPerDay.push(newObj);
    } else {
      serverNewWordPerDay.push({
        date: currentDate,
        counter: learnWordToday
      });
    }

    // create percentRigth (Works good)
    const percentRigth = newStatistics.optional.audio.percentRigth;
    percentRigth.right += answerCorrectLength;
    percentRigth.wrong += answerWrongLength;

    // create longestStrick
    const currentMaxStrick = Math.max(...allStricks);
    const serverMaxStrick = newStatistics.optional.audio.longestStrick;
    const maxStrick = currentMaxStrick > serverMaxStrick ? currentMaxStrick : serverMaxStrick;
    newStatistics.optional.audio.longestStrick = maxStrick;
  } else {
    // if statistics not exist yet
    newStatistics = initialUserStatistics;

    newStatistics.optional.audio.learnNewWordPerDay[0].date = currentDate;
    newStatistics.optional.audio.learnNewWordPerDay[0].counter += learnWordToday;
    
    // create percentRigth
    const percentRigth = newStatistics.optional.audio.percentRigth;
    percentRigth.right += answerCorrectLength;
    percentRigth.wrong += answerWrongLength;

    // create longestStrick
    newStatistics.optional.audio.longestStrick = Math.max(...allStricks);
  }

  try {
    console.log({
      userId,
      newStatistics,
      learnWordToday,
      answerCorrectLength,
      answerWrongLength,
      allStricks
    });
    apiUsersStatistic.setNewStatistics(userId, newStatistics);
  } catch (err) {
    console.log(err);
  }
};
