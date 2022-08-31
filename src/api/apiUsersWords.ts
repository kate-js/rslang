import {
  checkRes,
  EApiParametrs,
  IApiInitialData,
  IUserWord,
  IHeaders,
  getJwtToken
} from './apiConstants';

class ApiUsersWords implements IApiUsersWords {
  public baseUrl = '';
  public headers: IHeaders = {} as IHeaders;
  constructor(options: IApiInitialData) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /*  getsAllUserWords
    Gets all user words
    route:  /users/{id}/words
    
    Parameters:
      path id=userId

    Responses: 
      [
        {
          "difficulty": "string",
          "optional": {}
        }
      ]
  */
  public async getsAllUserWords(userId: string): Promise<IUserWord[]> {
    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() }
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserWord[];
  }

  /*  createUserWordById
    Create a user word by id
    route:  /users/{id}/words/{wordId}

    Parameters:
      path id=userId
      path wordId=wordId

    Request body (required):
      {
        "difficulty": "string",
        "optional": {}
      }

    Responses:
      {
        "difficulty": "string",
        "optional": {}
      }
  */
  public async createUserWordById(
    userId: string,
    wordId: string,
    word: IUserWord
  ): Promise<IUserWord> {
    const fetchConfig = {
      method: 'POST',
      headers: { ...this.headers, authorization: getJwtToken() },
      body: JSON.stringify({
        difficulty: word.difficulty,
        optional: word.optional
      })
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserWord;
  }

  /*  getUserWordById
    Gets a user word by id
    route:  /users/{id}/words/{wordId}

    Parameters:
      path id=userId
      path wordId=wordId

    Responses:
      {
        "difficulty": "string",
        "optional": {}
      }
  */
  public async getUserWordById(userId: string, wordId: string): Promise<IUserWord> {
    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() }
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserWord;
  }

  /*  updateUserWordById
    Updates a user word by id
    route:  /users/{id}/words/{wordId}

    Parameters:
      path id=userId
      path wordId=wordId

    Request body (required):
      {
        "difficulty": "string",
        "optional": {}
      }

    Responses:
      {
        "difficulty": "string",
        "optional": {}
      }
  */
  public async updateUserWordById(
    userId: string,
    wordId: string,
    word: IUserWord
  ): Promise<IUserWord> {
    const fetchConfig = {
      method: 'PUT',
      headers: { ...this.headers, authorization: getJwtToken() },
      body: JSON.stringify({
        difficulty: word.difficulty,
        optional: word.optional
      })
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserWord;
  }

  /*  deleteUserWordsById
    Deletes user words by id
    route:  /users/{id}/words/{wordId}

    Parameters:
      path id=userId
      path wordId=wordId

    Responses:
      {
        "difficulty": "string",
        "optional": {}
      }
  */
  public async deleteUserWordsById(userId: string, wordId: string): Promise<IUserWord> {
    const fetchConfig = {
      method: 'DELETE',
      headers: { ...this.headers, authorization: getJwtToken() }
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserWord;
  }
}

// create instance of the api class

export const apiUsersWords = new ApiUsersWords({
  baseUrl: EApiParametrs.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // authorization: 'Bearer '
  }
});

// interfaces

export interface IApiUsersWords {
  baseUrl: string;
  headers: IHeaders;
  getsAllUserWords: (userId: string) => Promise<IUserWord[]>;
  createUserWordById: (userId: string, wordId: string, word: IUserWord) => Promise<IUserWord>;
  getUserWordById: (userId: string, wordId: string) => Promise<IUserWord>;
  updateUserWordById: (userId: string, wordId: string, word: IUserWord) => Promise<IUserWord>;
  deleteUserWordsById: (userId: string, wordId: string) => Promise<IUserWord>;
}
