import './main.scss';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/registrationPage';
import ProfilePage from './pages/profilePage';
import ChatPage from './pages/chatPage';
import {router} from "./services/Router/Router";
import AuthController from "./controllers/AuthController";
import {ChatController} from "./controllers";

window.addEventListener('DOMContentLoaded',  async () => {
  router
      .use('/', LoginPage)
      .use('/sign-up', RegistrationPage)
      .use('/settings', ProfilePage)
      .use('/login', LoginPage)
      .use('/messenger', ChatPage)
    try {
        await AuthController.getUserInfo()
            .catch(() => router.go('/'));
        router.start()
        await ChatController.getChats()
        // router.go('/chats')
   } catch(e) {
        // router.go('/login')
    }
});
