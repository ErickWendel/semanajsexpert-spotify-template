import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { extname, join } from 'path';
import config from './config.js';

const { publicDirectory } = config.dir;

export class Service {
  createFileStream(filename) {
    return createReadStream(filename);
  }

  async getFileInfo(filename) {
    const fullPath = join(publicDirectory, filename);
    // validate existence of file
    await access(fullPath);
    const filetype = extname(fullPath);

    return {
      name: fullPath,
      type: filetype,
    };
  }

  async getFileStream(filename) {
    const { name, type } = await this.getFileInfo(filename);

    return {
      stream: this.createFileStream(name),
      type,
    };
  }
}
