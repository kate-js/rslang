import { getJwtToken } from "../api/apiConstants";
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
    return json;
  }

  public async getWordInfo({userId, wordId, token}: {userId: string, token : string, wordId: string}): Promise<boolean[]> {
    const fetchConfig = {
      method: 'GET',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json' , "Authorization" : `Bearer ${token}`, 'Accept': 'application/json'},
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    let learn = false;
    let difficalty = false;
    if (res.status === 404) {
      return [difficalty, learn];
    }
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    if(json.difficulty === 'hard'){
      difficalty = true;
    } else if (json.difficalty === 'easy' || typeof(json.difficalty) == 'undefined'){
      difficalty = false;
    }
    try {
      if(json.optional.learningWord)
        learn = true;
    } catch (error) {
      learn = false;
    }
    
    return [difficalty, learn];
  }

  public async addHardWord({userId, token, wordId}: {userId: string, token : string, wordId: string}): Promise<UserWordsReponse[]> {
    const fetchConfig = {
      method: 'POST',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify({ difficulty: 'hard', optional: { learningWord: false } }),
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async changeHardWord({ userId, token, wordId, meta }: {userId: string, token : string, wordId: string, meta: any}): Promise<UserWordsReponse[]> {
    console.log('meta', meta);
    const payload = { ...meta };
    payload.difficulty = 'hard';
    payload.optional = { ...payload.optional, learningWord: false };

    const fetchConfig = {
      method: 'PUT',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify(payload),
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }
  public async delHardWord({userId, token, wordId}: {userId: string, token : string, wordId: string}): Promise<void> {
    const fetchConfig = {
      method: 'PUT',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify({ "difficulty": "easy",})
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
  }

  public async addLearningWord({userId, token, wordId}: {userId: string, token : string, wordId: string}): Promise<string> {
    const fetchConfig = {
      method: 'POST',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify({ difficulty: 'easy', optional: { learningWord: true }}),
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async changeLearningWord({userId, token, wordId, meta}: {userId: string, token : string, wordId: string, meta: any}): Promise<string> {
    const payload = { ...meta };
    payload.difficulty = 'easy';
    payload.optional = { ...payload.optional, learningWord: true };

    const fetchConfig = {
      method: 'PUT',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify(payload),
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }

  public async fetchWords({userId = null, token = null, group, numberPage} : {userId: string|null, token: string|null, group: number, numberPage:number}) {

    const fetchConfig = {
      method: 'GET',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
    };

    if (userId) {
      const res = await fetch(`${this.baseUrl}/users/${userId}/aggregatedWords?group=${''}&page=${''}&wordsPerPage=20&filter={"$and": [{"group": ${group}}, {"page": ${numberPage - 1}}]}`, fetchConfig);
      if (res.status !== 200) {
        throw new Error(`There was an error with status code ${res.status}`)
      }
      const json = await res.json();
      return json[0].paginatedResults;
    }

    const res = await fetch(`${this.baseUrl}/words?group=${group}&page=${numberPage - 1}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }

  public async deleteLearningWord({userId, token, wordId}: {userId: string, token : string, wordId: string}): Promise<string> {
    const fetchConfig = {
      method: 'PUT',
      withCredentials: true,
      headers: { ['Content-Type']: 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json',},
      body: JSON.stringify({ "optional": {learningWord: false}})
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, fetchConfig);
    if (res.status !== 200) {
      throw new Error(`There was an error with status code ${res.status}`)
    }
    const json = await res.json();
    return json;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getStatistics(userId: string): Promise<any> {
    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() }
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/statistics`, fetchConfig);
    const json = await res.json();
          return json.optional;
  }
}

export const api = new Api({
  baseUrl: EApiParametrs.baseUrl,
  headers: { ['Content-Type']: 'application/json'
}});
