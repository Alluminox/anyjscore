export class BootstrapServerConfig {
  constructor(host, port)  {
    this._host = host;
    this._port = port;
  }

  get host () {
    return this._host;
  }

  get port() {
    return this._port;
  }

  get data() {
    return {
      port: this._port,
      host: this._port
    }
  }

}

