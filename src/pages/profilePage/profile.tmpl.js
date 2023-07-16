import Handlebars from "handlebars";
import {InputTemplate as Input} from "../../components/Input/Input.tmpl";
import Avatar from '../../../public/avatar.png'

const profile = (props) => {
    const profileTmpl = `
        <div class="profile">
            <div class="profile__settings">
                <div class="profile__info">
                    <img class="profile__info-photo" src="${Avatar}" alt="avatar"/>
                    <p class="u-center-text u-margin-bottom">{{profile.name}}</p>
                </div>
                <form>
                    {{#each profileFields}}
                        <div class="info-block__item">
                            ${Input({
                                label: "{{label}}",
                                type: "{{type}}",
                                name: "{{name}}",
                                value: "{{value}}"
                            })}
                        </div>
                    {{/each}}
                    <div class="profile__actions">
                        <div class="u-center-text">
                        <button class="btn btn--blue" type="submit">Изменить данные</button>
                    </div>
                    <div class="u-center-text ">
                        <button class="btn btn--blue" type="submit">Изменить пароль</button>
                    </div>
                    <div class="u-center-text">
                        <button class="btn btn--red" type="submit">Выйти</button>
                    </div>
                </form>
            </div>
        </div>
    `
    const template = Handlebars.compile(profileTmpl);
    return template(props);
}

export default profile;
