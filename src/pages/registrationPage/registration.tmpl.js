import Handlebars from "handlebars";
import {InputTemplate as Input}  from '../../components/Input/Input.tmpl'

const registration = (props) => {
    const registrationTmpl = `
        <div class="form">
            <div class="card">
                <div class="u-center-text u-margin-bottom u-margin-top">
                    <h2 class="card__header">Регистрация</h2>
                </div>
                <form>
                    <div class="card__fields">
                        {{#each registrationFields}}
                           ${Input({
                                label: "{{label}}",
                                type: "{{type}}",
                                name: "{{name}}"
                           })}
                        {{/each}}
                    </div>
                    <div class="u-center-text u-margin-top">
                        <button class="btn btn--blue" type="submit">Зарегистрироваться</button>
                    </div>
                    <div class="u-center-text">
                        <button class="btn btn--white" type="submit">Войти</button>
                    </div>
                </form>
            </div>
        </div>
    `
    const template = Handlebars.compile(registrationTmpl);
    return template(props);
}

export default registration
