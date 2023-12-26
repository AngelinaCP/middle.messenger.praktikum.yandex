import { HTTP, BaseAPI } from '../services';

class AuthApi extends BaseAPI {
  _http: HTTP;

  constructor () {
    super();
    this._http = new HTTP('/auth');
  }

  public async signup (data: unknown) {
    return await this._http.post('/signup', { data });
  }

  public async signin (data: unknown) {
    return await this._http.post('/signin', { data });
  }

  public async getUserInfo () {
    return await this._http.get('/user');
  }

  public async logout () {
    return await this._http.post('/logout');
  }
}

export default new AuthApi();
