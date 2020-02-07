class ServerContext {

  constructor() {
    this._data = {};
    console.log('INSTANCIANDO CONTEXTO', this._data);
  }

  add(target, key, data) {

    if (!this._data[`_${target}`]) this._data[`_${target}`] = {};

    this._data[`_${target}`][key] = data;

    return this;
  }

  remove(target, key) {
    const r = this._data[`_${target}`][key];
    if (r) {
      delete this._data[`_${target}`][key];
    }
  }

  get(target) {
    return this._data[`_${target}`];
  }

  get data() {
    return { ...this._data }
  }
}

export default new ServerContext();

