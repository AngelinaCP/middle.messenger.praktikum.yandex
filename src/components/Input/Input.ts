import { Block } from '../Block/Block';
import { InputTemplate } from './Input.tmpl';

interface InputProps {
  class?: string
  name?: string
  type: string
  value?: string
  placeholder?: string
  blur?: (e: FocusEvent) => void
  click?: (e: FocusEvent) => void
}

export default class Input extends Block<InputProps> {
  constructor (props: InputProps) {
    super(props, 'input');
  }

  render () {
    return this.compile(InputTemplate(), this._props);
  }
}
