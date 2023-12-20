import {AuthFieldsProps, isLoginValid, registrationValid} from "../validate/validate";
import store from "../services/Store";
import {AuthApi} from "../api";
import {router} from "../services";

export interface User {
    id: number,
    first_name: string
    second_name: string
    display_name: string
    phone: string
    login: string
    avatar: string
    email: string
}


class AuthController {
    public async signIn(formData: FormData) {
        const formFields: Record<string, any> =  {};
        for (const [key, value] of formData.entries()) {
            formFields[key as string] = value;
        }

        if (!isLoginValid(formFields as AuthFieldsProps)) {
            throw new Error('')
        }

        return await AuthApi.signin(formFields)
    }

    public async signup(formData: FormData) {
        const formFields: Record<string, any> =  {};
        for (const [key, value] of formData.entries()) {
            formFields[key as string] = value;
        }

        if (!registrationValid(formFields as AuthFieldsProps)) {
            throw new Error('')
        }
        return await AuthApi.signup(formFields)
    }

    public async logout() {
        await AuthApi.logout()
        router.go('/')
    }

    public async getUserInfo() {
        const data = await AuthApi.getUserInfo()
        store.set('activeUser', data.response)
        return data.response
    }

}

export default new AuthController()


