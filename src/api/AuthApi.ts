import { HTTP, BaseAPI } from "../services";

class AuthApi extends BaseAPI {

    _http: HTTP;

    constructor() {
        super();
        this._http = new HTTP('/auth')
    }

    public signup(data: any): Promise<XMLHttpRequest> {
        return this._http.post('/signup', data)
    }

    public signin(data: any): Promise<XMLHttpRequest> {
        return this._http.post('/signin', data)
    }

    public getUserInfo() {
        return this._http.get('/user')
    }

    public logout() {
        return this._http.post('/logout')
    }
}

export default new AuthApi()
