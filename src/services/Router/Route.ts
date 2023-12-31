import { type Block } from '../../components/Block/Block';

export type BlockClass<B extends Record<string, any> = any> = new() => Block<B>;

export class Route {
  _pathname: string;
  _blockClass: BlockClass;
  _block: Block | null = null;
  _rootQuery: string;

  constructor (pathname: string, view: BlockClass, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = rootQuery;
  }

  match (pathname: string) {
    return pathname === this._pathname;
  }

  private _render (query: string, block: any) {
    const root = document.querySelector(query);
    if (root) {
      root.innerHTML = '';
      root.append(block.getContent());
    }
    // block?.dispatchComponentDidMount();

    return root;
  }

  render () {
    if (!this._block) {
      this._block = new this._blockClass();
      this._render(this._rootQuery, this._block);
      return;
    }

    this._render(this._rootQuery, this._block);
  }
}
