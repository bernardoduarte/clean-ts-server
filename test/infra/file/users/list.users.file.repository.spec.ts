import { ListUsersFileRepository } from '@/infra/file';
import { promises as fs } from 'fs';
import faker from '@faker-js/faker';
import * as path from 'path';

const mockUsersFileEnv = () => {
  return path.join(__dirname, faker.system.fileName());
};

describe('ListUsersFileRepository', () => {
  test('Should list an empty list', async () => {
    const mockedUsersFile = mockUsersFileEnv();
    process.env.USERS_FILE = mockedUsersFile;
    await fs.writeFile(mockedUsersFile, JSON.stringify([]));
    const sut = new ListUsersFileRepository();

    const users = await sut.listUsers();

    expect(users.length).toBe(0);
    await fs.unlink(mockedUsersFile);
  });
});
