import { mockUserModel } from 'src/domain/models/mocks';
import { ListUsers } from '..';

export const mockListUsersOutput = (): ListUsers.Output => [
  mockUserModel(),
  mockUserModel(),
];
