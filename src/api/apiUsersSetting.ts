import { checkRes, EApiParametrs, IApiInitialData, IHeaders, IUserSettings } from './apiConstants';

class ApiUsersSetting implements IApiUsersSetting {
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

  /*  getUserSettings
    Gets settings
    route:  /users/{id}/settings
    
    Parameters:
      path id=userId

    Responses: 
      {
        "wordsPerDay": 0,
        "optional": {}
      }
  */
  public async getUserSettings(userId: string): Promise<IUserSettings> {
    this.getToken();

    const fetchConfig = {
      method: 'GET',
      headers: this.headers
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/settings`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserSettings;
  }

  /*  setNewUserSettings
    Upserts new settings
    route:  /users/{id}/settings
    
    Parameters:
      path id=userId

    Responses: 
      {
        "wordsPerDay": 0,
        "optional": {}
      }
  */
  public async setNewUserSettings(
    userId: string,
    newSettings: IUserSettings
  ): Promise<IUserSettings> {
    this.getToken();

    const fetchConfig = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        wordsPerDay: newSettings.wordsPerDay,
        optional: newSettings.optional
      })
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}/settings`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserSettings;
  }
}

// create instance of the api class

export const apiUsersSetting = new ApiUsersSetting({
  baseUrl: EApiParametrs.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // authorization: 'Bearer '
  }
});

// interfaces

export interface IApiUsersSetting {
  baseUrl: string;
  headers: IHeaders;
  getUserSettings: (userId: string) => Promise<IUserSettings>;
  setNewUserSettings: (userId: string, newSettings: IUserSettings) => Promise<IUserSettings>;
}
