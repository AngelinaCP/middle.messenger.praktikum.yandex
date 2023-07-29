import {Block} from "../components/Block/Block";

export default function render<T extends Block>(query: string, component: T) {
    const root = document.querySelector(query);

    if (root) {
        root.appendChild(component.getContent())
    }
    component.dispatchComponentDidMount();
    return root;

}
