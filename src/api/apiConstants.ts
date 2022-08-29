// interface for discussions
export interface IUserWord {
  difficulty: 'string';
  optional: { [key: string]: string };
}
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

export const checkRes = (res: Response): Promise<Response> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`${res.status}`));
};

export enum EApiParametrs {
  baseUrl = 'https://rs-lang-final.herokuapp.com'
}
