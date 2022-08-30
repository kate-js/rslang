import {
  checkRes,
  EApiParametrs,
  IApiInitialData,
  IHeaders,
  IUserSettings,
  getJwtToken
} from './apiConstants';

class ApiUsersSetting implements IApiUsersSetting {
  public baseUrl = '';
  public headers: IHeaders = {} as IHeaders;
  constructor(options: IApiInitialData) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
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
    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() }
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
    const fetchConfig = {
      method: 'PUT',
      headers: { ...this.headers, authorization: getJwtToken() },
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
