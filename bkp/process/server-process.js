import { BootstrapServerContextManager as ServerContextManager } from '../bootstrap/server-context-manager';
export class ServerProcess {

  constructor() {
    this.next;
  }

  process() {}

  async call(contextManager) {
    try {

      const { key, data } = await this.process();
      contextManager.set('data', key, data);


      return { key, data };

    } catch(err) {
      console.error(`Error to execute process ${err}`)
      throw err;
    }
  }

  setNext(next) {
    this.next = next;
  }
}