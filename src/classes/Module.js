class Module {
  constructor (config = {}) {
    this.code = '';
    this.name = '';
    this.AU = 0;
    Object.assign(this, config);
  }
}
export default Module;
