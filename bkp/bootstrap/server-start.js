import { BootstrapServerContextManager as ServerContextManager } from './server-context-manager';

export class BootstrapServerStarter {

  async resolveProcess(process) {
    console.log('[x] Resolving process', process);

    await Promise.all(Object.keys(process).map(processKey => {
      console.log('Resolving....', processKey);
      let p = process[processKey];
      return p.call(ServerContextManager);
    }))
    
    
  }

  async start(callback) {

    try {
    
      await this.resolveProcess(ServerContextManager.get('process'));

      // callback(ServerContext.data);

    } catch(err) {

      console.log('ERROR on create bootstrap server -> ', err)
      process.exit(-1);
    }
  }
}
