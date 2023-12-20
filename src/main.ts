import './main.scss';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/registrationPage';
import ProfilePage from './pages/profilePage';
import ChatPage from './pages/chatPage';
import ErrorInfo from './pages/errorPage';
import {router} from "./services/Router/Router";
import AuthController from "./controllers/AuthController";
import {ChatController} from "./controllers";

window.addEventListener('DOMContentLoaded',  async () => {
  router
      .use('/', LoginPage)
      .use('/registration', RegistrationPage)
      .use('/settings', ProfilePage)
      .use('/login', LoginPage)
      .use('/chats', ChatPage)
      .use('/500', new ErrorInfo({
            code: '500',
            message: 'Уже фиксим',
            linkText: 'Вернуться обратно',
            class: 'error-block'
          }))
      .use('/400', new ErrorInfo({
            code: '400',
            message: 'Не туда попали',
            linkText: 'Вернуться обратно',
            class: 'error-block'
      }))
    try {
        await AuthController.getUserInfo()
            .catch(() => router.go('/'));
        router.start()
        await ChatController.getChats()
   } catch(e) {

    }
});
