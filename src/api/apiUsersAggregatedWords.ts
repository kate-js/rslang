import { WordResponse } from '../utils/constants';
import {
  checkRes,
  EApiParametrs,
  IApiInitialData,
  IUserWord,
  IHeaders,
  getJwtToken
} from './apiConstants';

class ApiAggregatedWords implements IApiAggregated {
  public baseUrl = '';
  public headers: IHeaders = {} as IHeaders;
  constructor(options: IApiInitialData) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /*  getAllAggregatedWords
   Gets all user aggregated words
    route:  /users/{id}/aggregatedWords
    
    Parameters:
      path id=userId
      query group=group (skip if you want result not depending on a group)
      query page=page
      query wordsPerPage=wordsPerPage
      query filter=filter stringified object which meet MongoDB Query object conditions

      Get all words that have difficulte="hard AND optional.key="value
      {"$and":[{"userWord.difficulty":"hard", "userWord.optional.key":"value"}]}

      Get all words that have difficulty equal="easy" OR do not have the linked userWord
      {"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}

      Get all words that have BOTH difficulty equal="easy" AND optional.repeat=true, OR do not have the linked userWord
      {"$or":[{"$and":[{"userWord.difficulty":"easy", "userWord.optional.repeat":true}]},{"userWord":null}]}

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
  public async getAllAggregatedWords(
    userId: string,
    query: IQueryAllAggregated
  ): Promise<Response> {
    const group = query.group ? `group=${query.group}` : '';
    const page = query.page ? `page=${query.page}` : '';
    const wordsPerPage = query.wordsPerPage ? `wordsPerPage=${query.wordsPerPage}` : '';
    const filter = query.filter ? `filter=${query.filter}` : '';

    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() }
    };

    const res = await fetch(
      `${this.baseUrl}/users/${userId}/aggregatedWords?${group}${
      group ? '&' : ''
      }${page}&${wordsPerPage}&${filter}`,
      fetchConfig
    );

    const wordsRes = checkRes(res);
    return wordsRes;
  }

  /*  getUserAggregatedWordById
    Gets a user aggregated word by id
    route:  /users/{id}/aggregatedWords/{wordId}
    
    Parameters:
      path id=userId
      path wordId=wordId
     
    Responses: 
      {
        "difficulty": "string",
        "optional": {}
      }
  */
  public async getUserAggregatedWordById(userId: string, wordId: string): Promise<IUserWord> {
    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() }
    };

    const res = await fetch(
      `${this.baseUrl}/users/${userId}/aggregatedWords/${wordId}`,
      fetchConfig
    );

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserWord;
  }
}

// create instance of the api class

export const apiAggregatedWords = new ApiAggregatedWords({
  baseUrl: EApiParametrs.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // authorization: 'Bearer '
  }
});

// interfaces

export interface IApiAggregated {
  baseUrl: string;
  headers: IHeaders;
  getAllAggregatedWords: (userId: string, query: IQueryAllAggregated) => Promise<Response>;
  getUserAggregatedWordById: (userId: string, wordId: string) => Promise<IUserWord>;
}

export interface IQueryAllAggregated {
  group: number | string;
  page: number | string;
  wordsPerPage: number | string;
  filter: string;
}
