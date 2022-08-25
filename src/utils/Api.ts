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
}

export const api = new Api({
  baseUrl: EApiParametrs.baseUrl,
  headers: { ['Content-Type']: 'application/json' }
});
