import { UserWordsReponse, WordResponse } from "./constants";

export enum EApiParametrs {
  baseUrl = 'https://rs-lang-final.herokuapp.com'
}

export interface ILoginUserData {
  email: string;
  password: string;
}

export interface INewUser {
  name: string;
  email: string;
  password: string;
}

export interface IApiInitialData {
  baseUrl: string;
  headers: { [key: string]: string };
}

export interface IApi {
  baseUrl: string;
  headers: { [key: string]: string };
  checkRes: (res: Response) => Promise<Response>;
  signup: (newUser: INewUser) => Promise<Response>;
  signin: (newUser: INewUser) => Promise<Response>;
}

class Api implements IApi {
  public baseUrl = '';
  public headers = {};
  
  constructor(options: IApiInitialData) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  public checkRes(res: Response): Promise<Response> {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`${res.status}`));
  }

  public async signup(newUser: INewUser): Promise<Response> {
    const fetchConfig = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      })
    };

    const res = await fetch(`${this.baseUrl}/users`, fetchConfig);
    return this.checkRes(res);
  }

  public async signin(user: ILoginUserData): Promise<Response> {
    const fetchConfig = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    };

    const res = await fetch(`${this.baseUrl}/signin`, fetchConfig);
    return this.checkRes(res);
  }

  public async getWords({group, numberPage} : {group: number, numberPage: number}): Promise<WordResponse[]> {
    const fetchConfig = {
      method: 'GET',
      headers: this.headers,
    };

    const res = await fetch(`${this.baseUrl}/words?group=${group}&page=${numberPage - 1}`, fetchConfig);
    const json = await res.json();
    return json;
  }

  public async getHardWords({userId, token}: {userId: string, token : string}): Promise<WordResponse[]> {
    const fetchConfig = {
      method: 'GET',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json' , "Authorization" : `Bearer ${token}`, 'Accept': 'application/json'},
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=4000&filter={"$and":[{"userWord.difficulty":"hard"}]}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json[0].paginatedResults;
  }

  public async getWord({id, token}: {id: string, token : string}): Promise<WordResponse[]> {
    const fetchConfig = {
      method: 'GET',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json' , "Authorization" : `Bearer ${token}`, 'Accept': 'application/json'},
    };

    const res = await fetch(`${this.baseUrl}/words/${id}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    console.log('json', json);
    return json;
  }

  public async getWordInfo({userId, wordId, token}: {userId: string, token : string, wordId: string}): Promise<WordResponse[] | boolean> {
    console.log(userId, wordId, token);
    const fetchConfig = {
      method: 'GET',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json' , "Authorization" : `Bearer ${token}`, 'Accept': 'application/json'},
    };
    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    if (res.status === 404) {
      return res.ok;
    } else if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    console.log('json', json);
    return json;
  }

  public async addHardWord({userId, token, word}: {userId: string, token : string, word: WordResponse}): Promise<UserWordsReponse[]> {
    
    const fetchConfig = {
      method: 'POST',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify({ "difficulty": "hard", "optional": {test: 'test'}})
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${word.id}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }
  public async delHardWord({userId, token, word}: {userId: string, token : string, word: WordResponse}): Promise<UserWordsReponse[]> {
    
    const fetchConfig = {
      method: 'PUT',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify({ "difficulty": "weak"})
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${word.id}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }

}

export const api = new Api({
  baseUrl: EApiParametrs.baseUrl,
  headers: { ['Content-Type']: 'application/json'
}});
