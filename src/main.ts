import './main.scss';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/registrationPage';
import ProfilePage from './pages/profilePage';
import ChatPage from './pages/chatPage';
import { router } from './services/Router/Router';
import AuthController from './controllers/AuthController';
import { ChatController } from './controllers';
import NotFound from "./pages/404";
import ServerError from "./pages/500";

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use('/', LoginPage)
    .use('/sign-up', RegistrationPage)
    .use('/settings', ProfilePage)
    .use('/login', LoginPage)
    .use('/messenger', ChatPage)
    .use('/400', NotFound)
    .use('/500', ServerError);

  try {
    await AuthController.getUserInfo();
    router.start();
    await ChatController.getChats();
  } catch (e) {
    router.go('/');
  }
});
