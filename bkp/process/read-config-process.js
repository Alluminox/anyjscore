import path from 'path';
import fs from 'fs';
import jsYaml from 'js-yaml';

import { ServerProcess } from './server-process';


// const resolveServerConfig = (server) => {}
// const resolveGatewayConfig = (gateway) => {}

class ReadYamlConfigServerProcess extends ServerProcess {

  process() {
    return new Promise((r, j) => {

      const baseProject = process.cwd();
      const yamFile = path.resolve(baseProject, 'config.yaml')

      if (!fs.existsSync(yamFile)) return j(new Error(`Missing file config.yaml on ${baseProject}`))

      const data = jsYaml.safeLoad(fs.readFileSync(yamFile));

      r({ key: 'config', data });
    });
  }
}

export const ReadConfigServerProcess = new ReadYamlConfigServerProcess();