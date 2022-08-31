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
  id: 'string';
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

export interface IModal {
  modal: boolean;
  setModal: (item: boolean) => void;
  word: WordResponse | undefined;
}

export interface IWord {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string,
  correct?: boolean,
}

export interface IState {
  isLoaded: boolean,
  words: IWord[];
}

export interface IVolumeSettings {
  volume: number,
  isMuted: boolean,
}

export interface IComponentState {
  answerCount?: number,
  volumeSettings?: IVolumeSettings,
  possibleAnswers?: IWord[],
  answer?: IWord,
  answers?: IWord[],
  audio?: HTMLAudioElement,
  wordsToShow?: IWord[],
  appState?: IState,
  isAnswered?: boolean,
  isWelcomeScreen?: boolean,
}

export type keys = 'appState' | 'isAnswered' | 'wordsToShow' | 'answer' | 'audio' | "answerCount" | "volumeSettings" | 'possibleAnswers' | 'isWelcomeScreen';
