import { Service } from './service.js';

export class Controller {
  constructor() {
    this.service = new Service();
  }

  getFileStream(filename) {
    return this.service.getFileStream(filename);
  }
}
