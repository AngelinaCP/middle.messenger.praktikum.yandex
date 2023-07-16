import Handlebars from "handlebars";

export const InputTemplate = (props) => {
    const inputFieldTmpl = `
        <div class="card__field">
            <span class="card__label">{{label}}</span>
            <input class="card__input" type={{type}} name={{name}} value={{value}}>
        </div>
    `
    const template = Handlebars.compile(inputFieldTmpl);
    return template(props);
}

