import { ErrorPageTemplate } from './errorPage.tmpl';
import { Block } from '../../components/Block/Block';
import './errorPage.scss';
export class ErrorInfo extends Block {
  constructor () {
    super({}, 'div');
  }

  render () {
    return this.compile(ErrorPageTemplate(), this._props);
  }
}
