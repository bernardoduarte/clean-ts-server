import { FileListUsers } from '@/data/usecases';
import { ListUsersRepositorySpy } from '../mocks';

type SutTypes = {
  sut: FileListUsers;
  listUsersRepositorySpy: ListUsersRepositorySpy;
};

const makeSut = (): SutTypes => {
  const listUsersRepositorySpy = new ListUsersRepositorySpy();
  const sut = new FileListUsers(listUsersRepositorySpy);
  return {
    sut,
    listUsersRepositorySpy,
  };
};

describe('FileListUsers', () => {
  test('Should call ListUsersRepository', async () => {
    const { sut, listUsersRepositorySpy } = makeSut();

    await sut.listUsers();

    expect(listUsersRepositorySpy.callCount).toBe(1);
  });

  test('Should return a list of Users on success', async () => {
    const { sut, listUsersRepositorySpy } = makeSut();

    const output = await sut.listUsers();

    expect(output).toBe(listUsersRepositorySpy.output);
  });
});
