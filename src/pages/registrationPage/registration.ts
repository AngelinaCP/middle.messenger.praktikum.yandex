import { Block } from '../../components/Block/Block';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { registrationTemplate } from './registration.tmpl';
import { type AuthFieldsProps, registrationValid, validate } from '../../validate/validate';

export default class RegistrationPage extends Block {
  constructor () {
    super('div', {});
  }

  init () {
    this._props.title = 'Регистрация';
    this._props.class = 'form';
    this._children.firstButton = new Button(
      {
        class: 'btn btn--blue',
        label: 'Зарегистрироваться',
        type: 'submit',
        click: (e: MouseEvent) => { this.submit(e); }
      });
    this._children.secondButton = new Button(
      {
        class: 'btn btn--white',
        label: 'Войти',
        type: 'submit'
      });
    this._children.loginInput = new Input(
      {
        class: 'card__input',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        blur: (e: FocusEvent) => {
          if (e) {
            validate(e, 'login');
          }
        }
      });
    this._children.emailInput = new Input(
      {
        class: 'card__input',
        name: 'email',
        type: 'email',
        placeholder: 'Почта',
        blur: (e: FocusEvent) => {
          if (e) {
            validate(e, 'email');
          }
        }
      });
    this._children.passwordInput = new Input(
      {
        class: 'card__input',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        blur: (e: FocusEvent) => {
          if (e) {
            validate(e, 'password');
          }
        }
      });
    this._children.nameInput = new Input(
      {
        class: 'card__input',
        name: 'first_name',
        type: 'text',
        placeholder: 'Имя',
        blur: (e: FocusEvent) => {
          if (e) {
            validate(e, 'name');
          }
        }
      });
    this._children.surnameInput = new Input(
      {
        class: 'card__input',
        name: 'second_name',
        type: 'text',
        placeholder: 'Фамилия',
        blur: (e: FocusEvent) => {
          if (e) {
            validate(e, 'name');
          }
        }
      });
    this._children.phoneInput = new Input(
      {
        class: 'card__input',
        name: 'phone',
        type: 'text',
        placeholder: 'Телефон',
        blur: (e: FocusEvent) => {
          validate(e, 'phone');
        }
      });
  }

  submit (e: MouseEvent) {
    e.preventDefault();
    const form = this._element.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    const formFields: Record<string, any> = {};
    const authFormFields = formFields as AuthFieldsProps;
    for (const [key, value] of formData.entries()) {
      formFields[key] = value;
    }
    if (registrationValid(authFormFields)) {
      console.log(formFields);
    }
  }

  render () {
    return this.compile(registrationTemplate(), this._props);
  }
}
