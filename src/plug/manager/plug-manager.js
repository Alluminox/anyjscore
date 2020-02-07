import Interfaces from '../../interfaces';

class PlugManager extends Interfaces.Manager {

  constructor() {
    super();


    this._plugs = [];
  }


  plug(plug) {
    let prevPlug = this.lastPlug();

    
    if (prevPlug) {
      prevPlug.setNext(plug);
    }


    this._plugs.push(plug)

    return this;
  }

  lastPlug() {

    if(this._plugs.length > 0) {

      return this._plugs[this._plugs.length - 1];
    }

    return null;
  }

  end() {
    return this._back;
  }
}

export default PlugManager;