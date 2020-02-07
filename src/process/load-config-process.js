import Interfaces from '../interfaces';

class LoadConfigProcess extends Interfaces.PlugProcess {
  async exec() {
    
    return { key: 'load-config-process', data: {loaded: true} };
  }
}


export default LoadConfigProcess;