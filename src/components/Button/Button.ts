import { Block } from '../Block/Block';
import { ButtonTemplate } from './Button.tmpl';

interface ButtonProps {
  class?: string
  label?: string
  type?: string
  click?: (e: MouseEvent) => void
}

export default class Button extends Block {
  constructor (props: ButtonProps) {
    super('button', props);
  }

  render () {
    return this.compile(ButtonTemplate(), this._props);
  }
}
