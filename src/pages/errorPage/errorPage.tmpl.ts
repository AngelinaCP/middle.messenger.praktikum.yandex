export const ErrorPageTemplate = () => {
    return `
        <h1 class="error-block__code">{{code}}</h1>
        <p class="error-block__message">{{message}}</p>
        <a class="error-block__link" href="/">{{linkText}}</a>
    `;

};

