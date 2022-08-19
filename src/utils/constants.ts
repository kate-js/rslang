export enum ERoutes {
  home = '/',
  about = '/about',
  games = '/games',
  audio = '/audio',
  sprint = '/sprint',
  statistics = '/statistics',
  tutorial = '/tutorial',
  group1 = '/tutorial/group1',
  notFound = '*'
}

export type cardTutorial = {
  id: number;
  name: string;
  url: string;
  description: string;
  bigName: string;
};