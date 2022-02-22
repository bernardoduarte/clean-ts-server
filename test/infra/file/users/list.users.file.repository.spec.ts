import { ListUsersFileRepository } from '@/infra/file';
import { promises as fs } from 'fs';
import { mockListUsersOutput } from 'test/domain/mocks';
import { getWritableFilePath } from 'test/infra/mocks';

const makeSut = () => {
  return new ListUsersFileRepository();
};

describe('ListUsersFileRepository', () => {
  let mockedUsersFile: string;

  beforeEach(async () => {
    mockedUsersFile = getWritableFilePath();
    process.env.USERS_FILE = mockedUsersFile;
    const file = await fs.open(mockedUsersFile, 'w');
    file.close();
  });

  afterEach(async () => {
    try {
      await fs.unlink(mockedUsersFile);
    } catch (error) {}
  });

  test('Should list an empty list', async () => {
    await fs.writeFile(mockedUsersFile, JSON.stringify([]));
    const sut = makeSut();

    const users = await sut.listUsers();

    expect(users.length).toBe(0);
  });

  test('Should list all users on success', async () => {
    const userModels = mockListUsersOutput();
    await fs.writeFile(mockedUsersFile, JSON.stringify(userModels));
    const sut = makeSut();

    const users = await sut.listUsers();

    expect(users.length).toBe(2);
    expect(users[0]).toStrictEqual(userModels[0]);
    expect(users[1]).toStrictEqual(userModels[1]);
  });

  test('Should throw if there is no file', async () => {
    await fs.unlink(mockedUsersFile);
    const sut = makeSut();

    const promise = sut.listUsers();

    expect(promise).rejects.toThrow();
  });
});
