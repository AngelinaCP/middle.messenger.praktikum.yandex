import './main.scss';
import LoginPage from './pages/loginPage/login';
import RegistrationPage from './pages/registrationPage/registration';
import ProfilePage from './pages/profilePage/profile';
import ChatPage from './pages/chatPage/chat';
import ErrorInfo from './pages/errorPage/errorPage';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;
  const url = window.location.pathname;

  let page;
  switch (url) {
    case '/':
      page = new LoginPage();
      root.append(page.getContent()!);
      break;
    case '/registration':
      page = new RegistrationPage();
      root.append(page.getContent()!);
      break;
    case '/profile':
      page = new ProfilePage();
      root.append(page.getContent()!);
      break;
    case '/login':
      page = new LoginPage();
      root.append(page.getContent()!);
      break;
    case '/chats':
      page = new ChatPage();
      root.append(page.getContent()!);
      break;
    case '/500':
      page = new ErrorInfo({
        code: '500',
        message: 'Уже фиксим',
        linkText: 'Вернуться обратно'
      });
      root.append(page.getContent()!);
      break;
    default:
      page = new ErrorInfo({
        code: '400',
        message: 'Не туда попали',
        linkText: 'Вернуться обратно'
      });
      root.append(page.getContent()!);
      break;
  }

  page.dispatchComponentDidMount();
});
