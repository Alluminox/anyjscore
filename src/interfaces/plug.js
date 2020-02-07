export default class Plug {

  constructor(key = '', process = null) {
    this._key = key;
    this._process = process;

    this._next;
  }

  setProcess(process) {
    this._process = process;
  }

  setKey(key) {
    this._key = key;
  }

  setNext(next) {
    this._next = next
  }

  play() {
    throw new Error("Implement play method into subclass")
  }

  playNext() {
    console.log('HAS PLAY NEXT', this._next)
    if (this._next) {
   
      return this._next.play();
    }
  }


}