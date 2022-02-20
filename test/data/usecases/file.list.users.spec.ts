import { FileListUsers } from '@/data/usecases';
import { ListUsersRepositorySpy } from '../mocks';

describe('FileListUsers', () => {
  it('Should call ListUsersRepository', async () => {
    const listUsersRepositorySpy = new ListUsersRepositorySpy();
    const sut = new FileListUsers(listUsersRepositorySpy);

    await sut.listUsers();

    expect(listUsersRepositorySpy.callCount).toBe(1);
  });
});
