import {loginTemplate} from "./login.tmpl";
import {Block} from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {AuthFieldsProps, isLoginValid, validate} from "../../validate/validate";
import './login.scss'

export default class LoginPage extends Block {
    constructor() {
        super("div");
    }

    init() {
        this._props.title = 'Вход'
        this._props.class = 'form'
        this._children.firstButton = new Button(
            {
                        class: "btn btn--blue",
                        label: "Авторизоваться",
                        type: "submit",
                        click: (e: MouseEvent) => this.submit(e)
            })
        this._children.secondButton = new Button(
            {
                        class: "btn btn--white",
                        label: "Нет аккаунта?",
                        type: "submit"
            })
        this._children.loginInput = new Input(
            {
                        class:"card__input",
                        name: "login",
                        type: "text",
                        placeholder: 'Логин',
                        blur: (e: FocusEvent) =>  {
                            if (e) {
                                validate(e, 'login')
                            }}
            })
        this._children.passwordInput = new Input(
            {
                        class:"card__input",
                        name: "password",
                        type: "password",
                        placeholder: 'Пароль',
                        blur: (e: FocusEvent) =>  {
                            if (e) {
                                validate(e, 'password')
                            }}
                })
    }

    submit(e: MouseEvent) {
        e.preventDefault();
        const form = <HTMLFormElement>this._element.querySelector('form');
        const formData = new FormData(form);
        const formFields: Record<string, any> = {}
        const authFormFields = formFields as AuthFieldsProps
        for (let [key, value] of formData.entries()) {
            formFields[key] = value;
        }
        if (isLoginValid(authFormFields)) {
            console.log(formFields)
        }
    }

    render() {
        return this.compile(loginTemplate(), this._props)
    }
}
