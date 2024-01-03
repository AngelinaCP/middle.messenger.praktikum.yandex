import { Block } from '../../components/Block/Block';
import ErrorPage from '../errorPage';
import { ServerErrorTemplate } from './500.tmpl';

export default class ServerError extends Block {
  constructor () {
    super({ class: 'error-block' }, 'div');
  }

  init () {
    this._children.page = new ErrorPage({
      code: '500',
      message: 'Мы уже фиксим'
    });
  }

  render () {
    return this.compile(ServerErrorTemplate(), this._props);
  }
}
