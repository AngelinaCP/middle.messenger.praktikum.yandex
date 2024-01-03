import { HTTP, BaseAPI } from '../services';
import { type User } from '../controllers/AuthController';

class ProfileAPI extends BaseAPI {
  _http: HTTP;

  constructor () {
    super();
    this._http = new HTTP('/user');
  }

  async getUser (userId: string) {
    return await this._http.get(`/${userId}`);
  }

  async changeUserInfo (user: User) {
    return await this._http.put('/profile', { data: user });
  }

  async changeUserPassword (passwords: Record<string, string>) {
    return await this._http.put('/password', { data: passwords });
  }

  async updateAvatar (formData: FormData) {
    return await this._http.put('/profile/avatar', { data: formData });
  }
}

export default new ProfileAPI();
