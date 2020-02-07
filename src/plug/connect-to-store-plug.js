import Interfaces from '../interfaces';

class ConnectToStorePlug extends Interfaces.Plug {

  constructor(key = '', process = null) {
    super(key, process);
  }

  async play() {
    try {

      const res = await this._process.exec();
      // 1 - UPDATE CONTEXT


      // 2 - CALL NEXT PLUG
      await this.playNext()
      
      
    } catch(err) {
      // emitter
      console.log('ERROR ON CONNECT TO STORE PLUG', err);
    }
  }



}

export default ConnectToStorePlug