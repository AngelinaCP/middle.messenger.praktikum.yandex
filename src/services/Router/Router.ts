import { type BlockClass, Route } from './Route';

class Router {
  static __instance: any;
  routes: Route[];
  history: History;
  _currentRoute: Route | null = null;

  constructor () {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  use (pathname: string, block: BlockClass) {
    console.log('blick ', block);
    const route = new Route(pathname, block, '.app');
    this.routes.push(route);
    return this;
  }

  start () {
    window.onpopstate = event => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute (pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }
    this._currentRoute = route;
    route.render();
  }

  go (pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute (pathname: string) {
    return this.routes.find(route => route._pathname.match(pathname));
  }
}

export const router = new Router();
