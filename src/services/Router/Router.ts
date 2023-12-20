import {BlockClass, Route} from "./Route";

class Router {
    static __instance: any;
    routes: any[];
    history: History;
    _currentRoute: null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockClass) {
        const route = new Route(pathname, block, '.app');
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = event => {
            this._onRoute((<Window>event.currentTarget).location.pathname);
        }
        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }
        this._currentRoute = route

        route.render(route, pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route._pathname.match(pathname));
    }
}

export const router =  new Router()
