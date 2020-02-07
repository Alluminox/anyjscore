import { BootstrapServerStarter } from './server-start';
import ServerContext from './server-context';

/* Process Manager */
class ServerContextManager {

  getContext() {
    return ServerContext;
  }

  getData() {
    return ServerContext.data;
  }

  get(key) {
    return ServerContext.get(key);
  }

  set(target, key, action) {
    ServerContext.add(target, key, action);
    return this;
  }

  end() {
    return new BootstrapServerStarter();
  }

  updateContext(newContext) {
    ServerContext = newContext;
  }

}

export const BootstrapServerContextManager = new ServerContextManager();