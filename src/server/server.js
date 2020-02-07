import { EventEmitter } from 'events';

import ServerContext  from '../context/context';
import PlugManager from '../plug/manager/plug-manager';

import EventKeys from './events/event-keys';
import EventActions from './events/event-actions';

import ServerContext from '../context/context';

import { joinKeysActions } from '../utils';


class Server {

  constructor() {
    this._plugManager = new PlugManager();

  }

  create() {

    this._plugManager.setBack(this);

    ServerContext.setState({
      key: 'emitter',
      data: new EventEmitter()
    })

    return this._plugManager;
  }


  async start() {
    this.listeningEvents();
    await this._plugManager._plugs[0].play();
  }

  stop() {
    const emitter = ServerContext.getState('emitter');
    if (emitter) {

      
      emitter.emit('stopServer', 'Stop server!');
    }
  }

  listeningEvents() {
    
    // Resoving -> Joining event + actions
    const map = joinKeysActions(EventKeys, EventActions);

    const emitter = ServerContext.getState('emitter');

    if (emitter) {
      Object.keys(map).forEach(key => {
        console.log('Listening server events', key)

        const act = map[key];
        if (act) {
          emitter.on(key, act)
        }
    
      });
    }
  }
}


export default new Server();