export enum ERoutes {
  home = '/',
  about = '/about',
  games = '/games',
  audio = '/audio',
  sprint = '/sprint',
  statistics = '/statistics',
  tutorial = '/tutorial',
  grouplevel = '/tutorial/grouplevel',
  notFound = '*'
}

export type cardTutorial = {
  id: number;
  name: string;
  url: string;
  description: string;
  bigName: string;
};

export type Props = {
  children: React.ReactNode;
};

export interface WordResponse {
  userWord?: UserWordsReponse;
  id: 'string';
  _id: 'string';
  group: 'number';
  page: 'number';
  word: 'string';
  image: 'string';
  audio: 'string';
  audioMeaning: 'string';
  audioExample: 'string';
  textMeaning: 'string';
  textExample: 'string';
  transcription: 'string';
  wordTranslate: 'string';
  textMeaningTranslate: 'string';
  textExampleTranslate: 'string';
}

export interface UserWordsReponse {
  id?: string;
  difficulty: 'hard' | 'easy';
  optional: {
    // wordId: string;
    learningWord: boolean;
    counterCorrectAnswer: number; // if (counter === 3) { SET learningWord: true}
    answerOrder: { answerArray: boolean[] }; // 'false, true, true, true'
  };
  wordId?: string;
}
export interface IModal {
  modal: boolean;
  setModal: (item: boolean) => void;
  word: WordResponse | undefined;
  changeModal: (item: WordResponse) => void;
}

export interface HardWordsReponse {
  paginatedResults: WordResponse[] | null;
}

export const POINT_INCREMENT_BY_LEVEL = [10, 20, 40, 80];
export const CIRCLE = [0, 1, 2];

export function getRandomInteger(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
