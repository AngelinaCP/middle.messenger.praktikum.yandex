import { Block } from '../Block/Block';
import { router } from '../../services';
import { LinkTemplate } from './Link.tmpl';

interface LinkProps {
  label: string
  to: string
}

class Link extends Block {
  constructor (props: LinkProps) {
    super({
      ...props,
      click: (e: MouseEvent) => {
        e.preventDefault();
        this.navigate();
      }
    }, 'a'
    );
  }

  navigate () {
    router.go(this._props.to);
  }

  render () {
    return this.compile(LinkTemplate(), this._props);
  }
}

export default Link;
