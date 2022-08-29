import {
  checkRes,
  EApiParametrs,
  IApiInitialData,
  IHeaders,
  IUserStatistics
} from './apiConstants';

class ApiUsersStatistic implements IApiUsersStatistic {
  public baseUrl = '';
  public headers: IHeaders = {} as IHeaders;
  constructor(options: IApiInitialData) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      this.headers.authorization = `Bearer ${token}`;
    }
  }

  /*  getStatistics
    Gets statistics
    route:  /users/{id}/statistics
    
    Parameters:
      path id=userId

    Responses: 
      {
        "learnedWords": 0,
        "optional": {}
      }
  */
  public async getStatistics(userId: string): Promise<IUserStatistics> {
    this.getToken();

    const fetchConfig = {
      method: 'GET',
      headers: this.headers
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/statistics`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserStatistics;
  }

  /*  setNewStatistics
    Upserts new statistics
    route:  /users/{id}/statistics
    
    Parameters:
      path id=userId

    Responses: 
      {
        "learnedWords": 0,
        "optional": {}
      }
  */
  public async setNewStatistics(
    userId: string,
    newStatistics: IUserStatistics
  ): Promise<IUserStatistics> {
    this.getToken();

    const fetchConfig = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        learnedWords: newStatistics.learnedWords,
        optional: newStatistics.optional
      })
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/statistics`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserStatistics;
  }
}

// create instance of the api class

export const apiUsersStatistic = new ApiUsersStatistic({
  baseUrl: EApiParametrs.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // authorization: 'Bearer '
  }
});

// interfaces

export interface IApiUsersStatistic {
  baseUrl: string;
  headers: IHeaders;
  getStatistics: (userId: string) => Promise<IUserStatistics>;
  setNewStatistics: (userId: string, newStatistics: IUserStatistics) => Promise<IUserStatistics>;
}
