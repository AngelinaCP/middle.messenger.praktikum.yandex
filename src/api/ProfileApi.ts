import {HTTP, BaseAPI} from "../services";
import {User} from "../controllers/AuthController";

class ProfileAPI extends BaseAPI {

    _http: HTTP;

    constructor() {
        super();
        this._http = new HTTP('/user')
    }

    getUser(userId: string) {
        return this._http.get(`/${userId}`)
    }

    changeUserInfo(user: User) {
        return this._http.put('/profile', {data: user})
    }

    changeUserPassword(passwords: Record<string, string>) {
        return this._http.put('/password', {data: passwords})
    }

    updateAvatar(formData: FormData) {
        return this._http.put('/profile/avatar', {data: formData})
    }
}

export default new ProfileAPI()
