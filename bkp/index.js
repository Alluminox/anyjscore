import { 
  ServerContext, 
  BootstrapServerStarter, 
  BootstrapServerInitializer, 
  BootstrapServerContextManager, 
  BootstrapServer ,
  BootstrapServerConfig
} from './bootstrap';

import { ReadConfigServerProcess, ServerProcess } from './process';



class TestNewProcess extends ServerProcess {

  process() {
    return new Promise((r,j) => {
      console.log('CURRENT CONTEXT MANAGER -> ', BootstrapServerContextManager.get('data'));
 
      r({ key: 'test', data: {}})
    });
  }

}

BootstrapServerInitializer.config({ host: 'localhost', port: 8080 })
  .set('process', 'READ_CONFIG', ReadConfigServerProcess)
  .set('process', 'TEST_PROCESS', new TestNewProcess())
  .end()
  .start((context) => {
    console.log('Start')
  });


// module.exports = {
//   Bootstrap: {
//     ServerContext, 
//     BootstrapServerStarter, 
//     BootstrapServerInitializer, 
//     BootstrapServerContextManager, 
//     BootstrapServer ,
//     BootstrapServerConfig
//   },
//   Process: {
//     ReadConfigServerProcess, 
//     ServerProcess
//   }
// }
