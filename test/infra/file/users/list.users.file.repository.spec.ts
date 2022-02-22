import { ListUsersFileRepository } from '@/infra/file';
import { FileHelper } from '@/infra/file/users/file-helper';
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
    await FileHelper.createFile(mockedUsersFile);
  });

  afterEach(async () => {
    try {
      await FileHelper.deleteFile(mockedUsersFile);
    } catch (error) {}
  });

  test('Should list an empty list', async () => {
    await FileHelper.writeJsonFile(mockedUsersFile, []);
    const sut = makeSut();

    const users = await sut.listUsers();

    expect(users.length).toBe(0);
  });

  test('Should list all users on success', async () => {
    const userModels = mockListUsersOutput();
    await FileHelper.writeJsonFile(mockedUsersFile, userModels);
    const sut = makeSut();

    const users = await sut.listUsers();

    expect(users.length).toBe(2);
    expect(users[0]).toStrictEqual(userModels[0]);
    expect(users[1]).toStrictEqual(userModels[1]);
  });

  test('Should throw if there is no file', async () => {
    await FileHelper.deleteFile(mockedUsersFile);
    const sut = makeSut();

    const promise = sut.listUsers();

    expect(promise).rejects.toThrow();
  });
});
