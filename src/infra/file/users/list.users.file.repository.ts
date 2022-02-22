import { ListUsersRepository } from '@/data/protocols';
import { FileHelper } from './file-helper';

export class ListUsersFileRepository implements ListUsersRepository {
  async listUsers(): Promise<ListUsersRepository.Output> {
    return FileHelper.readJsonFile(process.env.USERS_FILE);
  }
}
