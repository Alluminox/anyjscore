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



  start() {
    this.listeningEvents();

    // Executor executar a ação
    // await this._plugManager._plugs[0].play();

    return {
      on: (name, callback) => {
        const emitter = ServerContext.getState("emitter");
        
        if (emitter._events[name]) {
          callback();
        }
      },

      listening: (callback) => {

        // 1 - Update nos eventos 
        // 2 - Chamar os executors

        const emitter = ServerContext.getState("emitter");
        if (emitter) {
          emitter.on('listening', () => {

            callback()

          });
        }

        emitter.emit('listening', {})
        
      } 
    } 

  }



}


export default new Server();