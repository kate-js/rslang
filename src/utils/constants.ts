export enum ERoutes {
  home = '/',
  about = '/about',
  games = '/games',
  audio = '/audio',
  sprint = '/sprint',
  statistics = '/statistics',
  tutorial = '/tutorial',
  notFound = '*'
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
  playing?: boolean,
  answer?: IWord,
  answers?: IWord[],
  audio?: HTMLAudioElement,
  newWords?: IWord[],
  appState?: IState,
  isAnswered?: boolean
}

export type keys = 'appState' | 'isAnswered' | 'newWords' | 'answer' | 'audio' | "answerCount" | "volumeSettings";
