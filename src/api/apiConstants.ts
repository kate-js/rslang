// interface for discussions
export interface IUserWord {
  difficulty: 'hard' | 'easy';
  optional: {
    // wordId: string;
    learningWord: boolean;
    counterCorrectAnswer: number; // if (counter === 3) { SET learningWord: true}
    answerOrder: { answerArray: boolean[] }; // 'false, true, true, true'
  };
}

export const initialUserWordData: IUserWord = {
  difficulty: 'easy',
  optional: {
    learningWord: false,
    counterCorrectAnswer: 0,
    answerOrder: { answerArray: [] }
  }
};

export interface IUserStatistics {
  learnedWords: number;
  optional: { [key: string]: string };
}

export interface IUserSettings {
  wordsPerDay: number;
  optional: { [key: string]: string };
}
// end interface for discussions

export interface IApiInitialData {
  baseUrl: string;
  headers: { [key: string]: string };
}

export interface IHeaders {
  [key: string]: string;
}

export const checkRes = (rawRes: Response): Promise<Response> => {
  let res;
  if (rawRes.ok) {
    res = rawRes.json();
  } else {
    res = Promise.reject(new Error(`${rawRes.status}`));
  }
  return res;
};

export const getJwtToken = (): string => {
  let res = '';
  if (localStorage.getItem('currentUser')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    const token = currentUser.token;
    res = `Bearer ${token}`;
  }
  return res;
};

export enum EApiParametrs {
  baseUrl = 'https://rs-lang-final.herokuapp.com'
}

export interface ICurrentUser {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
