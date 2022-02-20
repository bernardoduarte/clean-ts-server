import { ListUsersFileRepository } from '@/infra/file';
import { promises as fs } from 'fs';

describe('ListUsersFileRepository', () => {
  test('Should list an empty list', async () => {
    await fs.writeFile(process.env.USERS_FILE, JSON.stringify([]));
    const sut = new ListUsersFileRepository();

    const users = await sut.listUsers();

    expect(users.length).toBe(0);
    await fs.unlink(process.env.USERS_FILE);
  });
});
