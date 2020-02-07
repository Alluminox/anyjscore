export default class Context {

  constructor() {
    this._data = {};
  }

  setState({key, data}) {
    this._data = Object.assign({}, this._data ,{ [key]: data });
  }

  getState(key) {
    return this._data[key] || {};
  }

  getKeys(){
    return Object.keys(this._data);
  }

}
