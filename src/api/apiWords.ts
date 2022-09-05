import { WordResponse } from '../utils/constants';
import { checkRes, EApiParametrs, IApiInitialData } from './apiConstants';

class ApiWords implements IApiWords {
  public baseUrl = '';
  public headers = {};
  constructor(options: IApiInitialData) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /* getWords
    Gets a chunk of words
    route:  /words 

    Parameters:
      query group=group number
      query page=page in the group

    Responses: 
      [
        {
          "id": "string",
          "group": 0,
          "page": 0,
          "word": "string",
          "image": "string",
          "audio": "string",
          "audioMeaning": "string",
          "audioExample": "string",
          "textMeaning": "string",
          "textExample": "string",
          "transcription": "string",
          "wordTranslate": "string",
          "textMeaningTranslate": "string",
          "textExampleTranslate": "string"
        }
      ]
  */
  public async getWords({ group, numberPage }: IWordRequest): Promise<WordResponse[]> {
    const fetchConfig = {
      method: 'GET',
      headers: this.headers
    };

    const res = await fetch(`${this.baseUrl}/words?group=${group}&page=${numberPage}`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as WordResponse[];
  }

  /* getWordById
    Gets a word with assets by id
    route:  /words/{id}

    Parameters:
      path id=wordId
   
    Responses: 
     {
        "id": "string",
        "group": 0,
        "page": 0,
        "word": "string",
        "image": "string",
        "audio": "string",
        "audioMeaning": "string",
        "audioExample": "string",
        "textMeaning": "string",
        "textExample": "string",
        "transcription": "string",
        "wordTranslate": "string",
        "textMeaningTranslate": "string",
        "textExampleTranslate": "string"
      }
  */
  public async getWordById(wordId: string): Promise<WordResponse> {
    const fetchConfig = {
      method: 'GET',
      headers: this.headers
    };

    const res = await fetch(`${this.baseUrl}/words/${wordId}`, fetchConfig);

    const wordRes = checkRes(res) as unknown;
    return wordRes as WordResponse;
  }
}

// create instance of the api class

export const apiWords = new ApiWords({
  baseUrl: EApiParametrs.baseUrl,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

// interfaces

export interface IApiWords {
  baseUrl: string;
  headers: { [key: string]: string };
  getWords: (req: IWordRequest) => Promise<WordResponse[]>;
  getWordById(wordId: string): Promise<WordResponse>;
}

export interface IWordRequest {
  group: number;
  numberPage: number;
}
