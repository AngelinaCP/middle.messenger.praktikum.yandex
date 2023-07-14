import Handlebars from "handlebars";
import {InputTemplate as Input}  from '../../components/Input/Input.tmpl'

const login = (props) => {
    const loginTmpl = `
        <div class="form">
            <div class="card">
                <div class="u-center-text u-margin-bottom u-margin-top">
                    <h2 class="card__header">Вход</h2>
                </div>
                <form>
                    <div class="card__fields">
                        {{#each loginFields}}
                           ${Input({
                                label: "{{label}}",
                                type: "{{type}}",
                                name: "{{name}}"
                            })}
                        {{/each}}
                    </div>
                     <div class="u-center-text u-margin-top-big">
                        <button class="btn btn--blue" type="submit">Авторизоваться</button>
                    </div>
                    <div class="u-center-text">
                        <button class="btn btn--white" type="submit">Нет аккаунта!</button>
                    </div>
                </form>
            </div>
        </div>
    `
    const template = Handlebars.compile(loginTmpl);
    return template(props);
}

export default login
