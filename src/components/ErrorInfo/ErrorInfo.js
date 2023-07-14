import Handlebars from "handlebars";

const ErrorInfo = (props) => {
    const errorTmpl = `
        <div class="error-block">
                <h1 class="error-block__code">{{code}}</h1>
                <p class="error-block__message">{{message}}</p>
                <a class="error-block__link" href="/">{{linkText}}</a>
           </div>
    `
    const template = Handlebars.compile(errorTmpl);
    return template(props);
}

export default ErrorInfo
