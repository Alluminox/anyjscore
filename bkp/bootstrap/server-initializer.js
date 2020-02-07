import { EventEmitter } from 'events';

import { BootstrapServerConfig } from './server-config';
import { BootstrapServerContextManager as ServerContextManager} from '../bootstrap/server-context-manager';

export class BootstrapServer {}


export class ServerEvent {
  constructor(key ,action) {
    this._key = key;
    this._action = action;
  }

  get key() { return this._key; }
  get action() { return this._action; }
}

export class ServerEventManager {
  constructor() {
    this._events = [];
  }

  exists(event) {
    return this._events.some(e => {
      e.key === event.key
    })
  }

  _comparator(event) {
    return (e) => e.key === event.key;
  }

  _getIndex(event) {
    return this._events.findIndex(e => this._comparator(event)(e))
  }

  replace(event) {
    const index = this._getIndex(event);
    if (index > -1) {
      this._events[index] = event;
    }
  }

  add(event) {
    if (!this.exists(event)) this._events.push(event)
    else this.replace(event);
  }

  remove(event) {
    let e = null;
    const index = this._getIndex(event);
    if (index > -1) {
      e = this._events[index];
      this._events.splice(index, 1);
    }

    return e;
  }

}

class ServerInitializer extends BootstrapServer {
  constructor()  {
    super();

    this._eventManager = new ServerEventManager();
    this._emitter = new EventEmitter();

    this.init();
  }

  init() {
    this._baseEvents().forEach(event => {
      this.addEvent(event.key, event.action);
    });
  }

  _baseEvents() {
    return [
      {
        key: 'UPDATE_CONTEXT',
        action: (data) => {
          ServerContextManager.updateContext(data);
        }
      },
      {
        key: 'SERVER_ERROR',
        action: (err) => {
          console.log(`Server has error ${err}`)
          process.exit(-1);
        }
      },
      {
        key: 'SERVER_CREATED',
        action: () => {
          console.log("bootstrap server has created")
        }
      }
    ]
  }

  addEvent(key, action) {
    this._eventManager.add(new ServerEvent(key, action));
    this._emitter.on(key, action);
    return this;
  }

  removeEvent(key) {
    const event = this._eventManager.remove(new ServerEvent(key));

    if (event) {
      this._emitter.removeListener(event.action);
    }

    return this;
  }

  config({ host, port }) {
    ServerContextManager.set('data','remote', new BootstrapServerConfig(host, port))
    ServerContextManager.set('data','events', this._eventManager)
    ServerContextManager.set('data','emitter', this._emitter);
 
    // BootstrapServer
    return ServerContextManager;
  }
}

export const BootstrapServerInitializer = new ServerInitializer()