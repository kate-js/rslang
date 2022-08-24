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

export interface IResponse {
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
};