import { ListUsers } from 'src/domain/usecases';
import { mockListUsersOutput } from 'src/domain/usecases/mocks';
import { ListUsersRepository } from '..';

export class ListUsersRepositorySpy implements ListUsersRepository {
  output: ListUsers.Output = mockListUsersOutput();
  callCount = 0;

  async listUsers(): Promise<ListUsers.Output> {
    this.callCount++;
    return this.output;
  }
}
