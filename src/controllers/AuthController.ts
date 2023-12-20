import {AuthFieldsProps, isLoginValid, registrationValid} from "../validate/validate";
import store from "../services/Store";
import {AuthApi} from "../api";
import {router} from "../services";
import {ChatController, MessagesController} from "./index";

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

        await AuthApi.signin(formFields)
        await this.getUserInfo()
        await ChatController.getChats()
    }

    public async signup(formData: FormData) {
        const formFields: Record<string, any> =  {};
        for (const [key, value] of formData.entries()) {
            formFields[key as string] = value;
        }

        if (!registrationValid(formFields as AuthFieldsProps)) {
            throw new Error('')
        }
        await AuthApi.signup(formFields)
        await this.getUserInfo()
    }

    public async logout() {
        await AuthApi.logout()
        store.reset()
        MessagesController.close()
        router.go('/')
    }

    public async getUserInfo() {
        const data = await AuthApi.getUserInfo()
        store.set('activeUser', data.response)
        return data.response
    }

}

export default new AuthController()


