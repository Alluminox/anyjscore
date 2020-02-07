import Interfaces from '../interfaces';

class ServerContext extends Interfaces.Context {
  constructor() {
    super();

    console.log('CREATING CONTEXT...')
  }
}

export default new ServerContext();

