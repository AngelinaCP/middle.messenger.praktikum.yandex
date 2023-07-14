import './main.scss'
import registration from "./pages/registrationPage/registration.tmpl";
import login from "./pages/loginPage/login.tmpl";
import chatTmpl from "./pages/chatPage/chat.tmpl";
import profile from "./pages/profilePage/profile.tmpl";
import error404 from "./pages/404Page/404Page.tmpl";
import error500 from "./pages/500Page/500Page.tmpl";
import {context} from "./constants/stubs.js";

const url = window.location.pathname;
const app = document.querySelector('#app');

switch (url) {
    case '/':
        app.innerHTML = login(context)
        break;
    case '/registration':
        app.innerHTML = registration(context)
        break;
    case '/profile':
        app.innerHTML = profile(context)
        break;
    case '/login':
        app.innerHTML = login(context)
        break;
    case '/chats':
        app.innerHTML = chatTmpl(context)
        break;
    case '/500':
        app.innerHTML = error500(context)
        break;
    default:
        app.innerHTML = error404(context)
        break;
}


