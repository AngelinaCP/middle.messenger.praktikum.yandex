import {EventBus} from "../EventBus";

export enum StoreEvents {
    Updated = 'updated',
}

type State<T = any> = {
    [key in string]: T
}

function merge(lhs: State, rhs: State): State {
    for (const p in rhs) {
        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as State, rhs[p] as State);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}


class Store extends EventBus {

    static _instance: Store;
    _state: any = {};

    constructor() {
        if (Store._instance) {
            return Store._instance
        }

        super()
    }

    public reset() {
        Object.keys(this._state).map(key => {
            this._state[key] = undefined
        })
    }

    public getState() {
        return this._state;
    }

    public set(path: string, value: unknown) {
        const paths = path.split('.')
        const setValue = paths.reduceRight<State>(
            (acc, key) => ({
                [key]: acc,
            }),
            value as any,
        );

        merge(this._state as State, setValue)
        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
