import { WordResponse } from '../utils/constants';
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
  optional: {
    sprint: {
      learnNewWordPerDay: [
        {
          date: string;
          counter: number;
        }
      ];
      percentRigth: {
        right: number;
        wrong: number;
      };
      longestStrick: number;
    };
    audio: {
      learnNewWordPerDay: [
        {
          date: string;
          counter: number;
        }
      ];
      percentRigth: {
        right: number;
        wrong: number;
      };
      longestStrick: number;
    };
    total: {
      learnNewWordPerDay: [
        {
          date: string;
          counter: number;
        }
      ];
      percentRigth: {
        right: number;
        wrong: number;
      };
      longestStrick: number;
    };
  };
}

export interface WordResponseWithData extends WordResponse {
  userWord?: IUserWord;
}

export interface WordWithDataResponse {
  paginatedResults: WordResponseWithData[];
  totalCount: { count: number }[];
}

export const initialUserStatistics: IUserStatistics = {
  learnedWords: 0,
  optional: {
    sprint: {
      learnNewWordPerDay: [
        {
          date: '',
          counter: 0
        }
      ],
      percentRigth: {
        right: 0,
        wrong: 0
      },
      longestStrick: 0
    },
    audio: {
      learnNewWordPerDay: [
        {
          date: '',
          counter: 0
        }
      ],
      percentRigth: {
        right: 0,
        wrong: 0
      },
      longestStrick: 0
    },
    total: {
      learnNewWordPerDay: [
        {
          date: '',
          counter: 0
        }
      ],
      percentRigth: {
        right: 0,
        wrong: 0
      },
      longestStrick: 0
    }
  }
};

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

export const optionsDate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};

export interface IOptional {
  learnNewWordPerDay: [
    {
      date: string;
      counter: number;
    }
  ];
  percentRigth: {
    right: number;
    wrong: number;
  };
  longestStrick: number;
}
  