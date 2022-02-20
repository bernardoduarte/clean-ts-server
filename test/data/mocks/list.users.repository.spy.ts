import { ListUsers } from '@/domain/usecases';
import { ListUsersRepository } from '@/data/protocols';
import { mockListUsersOutput } from 'test/domain/mocks';

export class ListUsersRepositorySpy implements ListUsersRepository {
  output: ListUsers.Output = mockListUsersOutput();
  callCount = 0;

  async listUsers(): Promise<ListUsers.Output> {
    this.callCount++;
    return this.output;
  }
}
