class Manager {

  constructor() {
    this._back;
    this._data = [];
  }

  setBack(back) {
    this._back = back;
  }

  get back() {
    return this._back;
  }

}

export default Manager