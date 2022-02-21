import { ListUsers } from '@/domain/usecases';
import { mockListUsersOutput } from 'test/domain/mocks';

export class ListUsersSpy implements ListUsers {
  output: ListUsers.Output = mockListUsersOutput();
  callCount = 0;

  async listUsers(): Promise<ListUsers.Output> {
    this.callCount++;
    return this.output;
  }
}
