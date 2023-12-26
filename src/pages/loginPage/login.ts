import { loginTemplate } from './login.tmpl';
import { Block } from '../../components/Block/Block';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { validate } from '../../validate/validate';
import './login.scss';
import { AuthController } from '../../controllers';
import { router } from '../../services';

export default class LoginPage extends Block {
  constructor () {
    super({}, 'div');
  }

  init () {
    this._props.title = 'Вход';
    this._props.class = 'form';
    this._props.error = '';
    this._children.signIn = new Button(
      {
        class: 'btn btn--blue',
        label: 'Авторизоваться',
        type: 'submit',
        click: (e: MouseEvent) => { this.submit(e); }
      });
    this._children.signUp = new Button(
      {
        class: 'btn btn--white',
        label: 'Нет аккаунта?',
        type: 'submit',
        click: (e: MouseEvent) => {
          e.preventDefault();
          router.go('/sign-up');
        }
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
  }

  submit (e: MouseEvent) {
    e.preventDefault();
    const form = this._element.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);

    AuthController.signIn(formData).then(() => {
      router.go('/messenger');
    }).catch((err) => {
      if (err.response?.reason === 'User already in system') {
        router.go('/messenger');
      }
      this.setProps({
        error: err.response.reason
      });
    });
  }

  render () {
    return this.compile(loginTemplate(), this._props);
  }
}
