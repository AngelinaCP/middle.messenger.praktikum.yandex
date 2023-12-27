import { Block } from '../../components/Block/Block';
import { NotFoundTemplate } from './404.tmpl';
import ErrorPage from '../errorPage';

export default class NotFound extends Block {
  constructor () {
    super({ class: 'error-block' }, 'div');
  }

  init () {
    this._children.page = new ErrorPage({
      code: '404',
      message: 'Не туда попали'
    });
  }

  render () {
    return this.compile(NotFoundTemplate(), this._props);
  }
}
