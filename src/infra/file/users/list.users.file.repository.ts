import { ListUsersRepository } from '@/data/protocols';

import { promises as fs } from 'fs';

export class ListUsersFileRepository implements ListUsersRepository {
  async listUsers(): Promise<ListUsersRepository.Output> {
    const buffer = await fs.readFile(process.env.USERS_FILE);
    const users = JSON.parse(buffer.toString());
    return users;
  }
}
