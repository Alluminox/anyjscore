import Interfaces from '../interfaces';

class ConnectToStoreProcess extends Interfaces.PlugProcess {
  async exec() {
    
    return { key: 'connect-store-process', data: {connected: true} };
  }
}


export default ConnectToStoreProcess;