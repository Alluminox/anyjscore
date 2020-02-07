import Interfaces from '../interfaces';

class LoadConfigPlug extends Interfaces.Plug {

  constructor(key = '', process = null) {
    super(key, process);
  }

  async play() {
    try {

      const res = await this._process.exec();
      return this.playNext()
      // 1 - UPDATE CONTEXT
      // 2 - 

    } catch(err) {
      // emitter
      console.log('ERROR ON LOAD CONFIG PLUG', err);
    }
  }



}

export default LoadConfigPlug;