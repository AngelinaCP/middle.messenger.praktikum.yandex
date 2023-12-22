import Handlebars, { type TemplateDelegate } from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import { EventBus } from '../../services';

export class Block<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  _element: HTMLElement;
  _meta;
  _props: Props;
  _children: Record<string, Block>;
  _id: string;
  _setUpdate = false;
  _eventBus;
  _events: Record<string, any> = {};

  constructor (propsAndChildren: Props, tagName: string = 'template') {
    const { props, children } = this.getChildren(propsAndChildren);
    const eventBus = new EventBus();
    this._eventBus = () => eventBus;
    this._meta = {
      tagName,
      props
    };
    this._id = uuidv4();
    this._children = children;
    this._props = this._makePropsProxy(props);
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents (eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources () {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _init () {
    this.init();
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init () {
  }

  _componentDidMount () {
    this.componentDidMount();
  }

  componentDidMount () {}

  dispatchComponentDidMount () {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate (oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate (oldProps: Props, newProps: Props) {
    return oldProps !== newProps;
  }

  setProps = (nextProps: Props) => {
     if (!nextProps) {
      return;
    }
    this._setUpdate = false;
    const oldProps = { ...this._props };
    const { props, children } = this.getChildren(nextProps);

    if (Object.keys(children).length > 0) {
      Object.assign(this._children, children);
    }
    if (Object.keys(props).length > 0) {
      Object.assign(this._props, props);
    }
    if (this._setUpdate) {
      this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, props);
      this._setUpdate = false;
    }
  };

  _isObject (obj: Props) {
    return typeof obj === 'object' && obj !== null;
  }

  _deepDiff<T extends Record<string, any>>(oldProps: T, newProps: T) {
    if (!oldProps || !newProps) {
      return;
    }
    const oldPropsKeys = Object.keys(oldProps);
    const newPropsKeys = Object.keys(newProps);

    if (oldPropsKeys.length !== newPropsKeys.length) return false;

    for (const key of oldPropsKeys) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];

      const isObjects = this._isObject(oldValue) && this._isObject(newValue);
      if ((isObjects && !this._deepDiff(oldValue, newValue)) ||
                (!isObjects && oldValue !== newValue)) {
        return true;
      }
    }
    return false;
  }

  _makePropsProxy (props: Props) {
    const self = this;
    return new Proxy(props, {
      set (target, prop: string, value) {
        if (!self._deepDiff(target[prop], value)) {
          target[prop as keyof Props] = value;
          self._setUpdate = true;
        }
        return true;
      },
      get (target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      deleteProperty (): boolean {
        throw new Error('Нет доступа');
      }
    });
  }

  get element () {
    return this._element;
  }

  getChildren (propsAndChildren: Record<string, any>) {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.length && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props: props as Props, children };
  }

  render () {
    return new DocumentFragment();
  }

  _render () {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addEvents();
  }

  addEvents () {
    Object.keys(this._events).forEach((key) => {
      this._element.addEventListener(key, this._events[key]);
    });
  }

  removeEvents () {
    Object.keys(this._events).forEach((key) => {
      this._element.removeEventListener(key, this._events[key]);
    });
  }

  getContent () {
    return this.element;
  }

  _createDocumentElement (tagName: string) {
    const element = document.createElement(tagName);

    Object.entries(this._props).forEach(([attr, value]) => {
      if (attr === 'class') {
        const classes = value.split(' ');
        if (Array.isArray(classes)) {
          classes.forEach(cls => { element.classList.add(cls); });
        } else {
          element.classList.add(value);
        }
      } else if (typeof value === 'function') {
        this._events[attr] = value;
      } else {
        element.setAttribute(attr, value);
      }
    });

    return element;
  }

  compile (template: string | TemplateDelegate, props: Record<string, any>) {
    if (typeof props === 'undefined') {
      props = this._props;
    }
    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((child) => `<div data-id="${child._id}"></div>`)
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    const replaceStub = (child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

      if (!stub) {
        return
      }
      child.getContent()?.append(...Array.from(stub.childNodes))
      stub.replaceWith(child.getContent()!)
    }

    Object.entries(this._children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub)
      } else {
        replaceStub(component)
      }
    })
    return fragment.content;
  }
}
