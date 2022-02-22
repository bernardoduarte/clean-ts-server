import { PathLike, promises as fs } from 'fs';

export const FileHelper = {
  async createFile(path: PathLike): Promise<void> {
    await (await fs.open(path, 'w')).close();
  },
  async deleteFile(path: PathLike): Promise<void> {
    await fs.unlink(path);
  },
  async readFile(path: PathLike) {
    return fs.readFile(path);
  },
  async writeFile(path: PathLike, data: string): Promise<void> {
    await fs.writeFile(path, data);
  },
  async readJsonFile(path: PathLike) {
    return JSON.parse(await this.readFile(path));
  },
  async writeJsonFile(path: PathLike, data: any) {
    await this.writeFile(path, JSON.stringify(data));
  },
};
