import { ListUsers } from 'src/domain/usecases';
import { ListUsersRepository } from '../protocols';

export class FileListUsers implements ListUsers {
  constructor(private readonly listUsersRepository: ListUsersRepository) {}

  async listUsers(): Promise<ListUsers.Output> {
    return this.listUsersRepository.listUsers();
  }
}
