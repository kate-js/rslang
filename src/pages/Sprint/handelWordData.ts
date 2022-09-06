import { apiUsersWords } from '../../api/apiUsersWords';
import { WordResponse } from '../../utils/constants';
import { IUserWord } from '../../api/apiConstants';

export const sendWordCurrentData = async (
  userId: string,
  wordId: string,
  isCorrectAnswer: boolean,
  wordCurrent: WordResponse,
  learnWordToday: number
) => {
  let learningWord = false;
  let counterCorrectAnswer = 0;
  let difficulty: 'easy' | 'hard' = 'easy';
  let answerOrder: boolean[] = [isCorrectAnswer];
  let newLearnWordToday = learnWordToday;

  //check is word known
  if (wordCurrent.userWord) {
    if (isCorrectAnswer) {
      counterCorrectAnswer = wordCurrent.userWord.optional.counterCorrectAnswer + 1;
      difficulty = wordCurrent.userWord.difficulty;

      // check word is hard
      if (difficulty === 'hard' && counterCorrectAnswer > 4) {
        difficulty = 'easy';
        learningWord = true;
      } else if (counterCorrectAnswer > 2) {
        learningWord = true;
      }
    }

    answerOrder = [...wordCurrent.userWord.optional.answerOrder.answerArray, isCorrectAnswer];
  } else {
    if (isCorrectAnswer) {
      counterCorrectAnswer = 1;
    }
    newLearnWordToday += 1;
  }

  const wordData: IUserWord = {
    difficulty: difficulty,
    optional: {
      learningWord: learningWord,
      counterCorrectAnswer: counterCorrectAnswer,
      answerOrder: { answerArray: answerOrder }
    }
  };

  try {
    if (wordCurrent.userWord) {
      apiUsersWords.updateUserWordById(userId, wordId, wordData);
    } else {
      apiUsersWords.createUserWordById(userId, wordId, wordData);
    }
  } catch (err) {
    console.log(err);
  }

  return newLearnWordToday;
};
