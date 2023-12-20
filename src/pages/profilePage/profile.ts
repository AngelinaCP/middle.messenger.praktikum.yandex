import { Block } from '../../components/Block/Block';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { profileTemplate } from './profile.tmpl';
import {type AuthFieldsProps, isPasswordValid, profileValid} from '../../validate/validate';
import './profile.scss';
import {User} from "../../controllers/AuthController";
import ProfileController from "../../controllers/ProfileController";
import profileController from "../../controllers/ProfileController";
import store from "../../services/Store";
import Avatar from "../../components/Avatar";
import {getAvatarStub} from "../../utils/utils";
import {AuthController} from "../../controllers";


const profileFields: Record<string, string> = {
    'email': 'Почта',
    'display_name': 'Имя в чате',
    'first_name': 'Имя',
    'second_name': 'Фамилия',
    'login': 'Логин',
    'phone': 'Телефон',
}

export class ProfilePage extends Block {
  constructor () {
    super({}, 'div');
  }

  init () {
    this._props.class = 'profile';
    this._props.dataChangedMessage = ''
    this._children.changeUserInfo = new Button(
      {
        class: 'btn btn--blue',
        label: 'Изменить данные',
        type: 'submit',
        click: (e: MouseEvent) => this.changeUserInfo(e)
      });
    this._children.changeUserPassword = new Button(
          {
              class: 'btn btn--blue',
              label: 'Изменить пароль',
              type: 'submit',
              click: (e: MouseEvent) => this.changePassword(e)
    });
    this._children.changeAvatar = new Button(
      {
          class: 'btn',
          label: 'Сменить аватар',
          type: 'submit',
          click: (e: MouseEvent) => this.changeAvatar(e)
      });
    this._children.avatar = new Avatar({
        class: "profile__info-photo",
        src: getAvatarStub(store.getState().activeUser?.avatar),
        alt: "avatar",
    })
    this._children.oldPassword = new Input({
          type: 'password',
          placeholder: 'Старый пароль',
          name: 'oldPassword',
            class: 'card__input'
      })
      this._children.newPassword = new Input({
          type: 'password',
          placeholder: 'Новый пароль',
          name: 'newPassword',
          class: 'card__input'
      })
      this._children.changeAvatarInput = new Input({
          type: 'file',
          placeholder: 'Добавьте файл',
          name: 'avatar',
      })
    this._children.logout = new Button({
        class: 'btn btn--red',
        label: 'Выйти',
        type: 'submit',
        click: (e: MouseEvent) => {
            e.preventDefault()
            AuthController.logout()
        }
    });
    this._children.profileFields = this.getProfileFields() as any
  }

  changeUserInfo (e: MouseEvent) {
    e.preventDefault();
    const form = (this._element.getElementsByClassName('fields-form'))[0] as HTMLFormElement;
    const formData = new FormData(form);
    const formFields: Record<string, any> =  {}

    for (const [key, value] of formData.entries()) {
      formFields[key as string] = value;
    }
    if (profileValid(formFields as AuthFieldsProps)) {
        ProfileController.changeUserInfo(formFields as User)
            .then(() => {
                this.setProps({
                    dataChangedMessage: 'Данные успешно изменены'
                })
            })
            .catch(e => {
                console.log('e', e);
                this.setProps({
                    dataChangedMessage: e.response?.reason
                })
            })
    }
  }

  changePassword (e: MouseEvent) {
      e.preventDefault();
      const form = (this._element.getElementsByClassName('fields-form'))[0] as HTMLFormElement;
      const formData = new FormData(form);
      const formFields: Record<string, any> =  {}

      for (const [key, value] of formData.entries()) {
          if (key === 'oldPassword' || key === 'newPassword') {
              formFields[key as string] = value;
          }
      }

      if (formFields['newPassword' as string] !== formFields['oldPassword' as string]
          && isPasswordValid(formFields['newPassword' as string])
          && isPasswordValid(formFields['oldPassword' as string])) {
          ProfileController.changeUserPassword(formFields)
              .then(() => {
                this.setProps({
                    dataChangedMessage: 'Пароль успешно изменен'
                })
              })
              .catch(e => {
                  this.setProps({
                      dataChangedMessage: e.response.reason
                  })
              })
      }
  }

  changeAvatar (e: MouseEvent) {
      e.preventDefault();
      const avatar = document.getElementsByName('avatar')[0] as HTMLInputElement
      const file = avatar.files?.[0]
      if (file) {
          const formData = new FormData()
          formData.append('avatar', file, file.name)
          profileController.updateAvatar(formData)
      }
  }

  private getProfileFields(): Input[] {
      const activeUser = store.getState().activeUser
      return Object.keys(profileFields).map((key: keyof User) =>
              new Input({
                  class: 'card__input',
                  name: key,
                  type: 'text',
                  placeholder: profileFields[key],
                  value: activeUser[key] !== null ? activeUser[key] :  '',
              })
          ) || []
  }

  componentDidUpdate(): boolean {
      this._children.avatar = new Avatar({
          class: "profile__info-photo",
          src: getAvatarStub(store.getState().activeUser?.avatar),
          alt: "avatar",
      })
      return true
  }

    render () {
      return this.compile(profileTemplate(), this._props);
  }
}
