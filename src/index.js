import Server from './server/server';

import LoadConfigPlug from  './plug/load-config-plug';
import LoadConfigProcess from './process/load-config-process';

import ConnectStorePlug from  './plug/connect-to-store-plug';
import ConnectStoreProcess from './process/connect-to-store-process';
import ServerResolver from './interfaces/resolver';

const firstplug = new LoadConfigPlug();
firstplug.setKey('LOAD_CONFIG');
firstplug.setProcess(new LoadConfigProcess());
// firstplug.play();


const secondPlug = new ConnectStorePlug();
secondPlug.setKey('CONNECT_TO_STORE');
secondPlug.setProcess(new ConnectStoreProcess());

const svr = Server.create()
.plug(firstplug)
.plug(secondPlug)
.end()

svr.start();
