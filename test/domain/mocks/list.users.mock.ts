import { ListUsers } from '@/domain/usecases';
import { mockUserModel } from './user.mock';

export const mockListUsersOutput = (): ListUsers.Output => [
  mockUserModel(),
  mockUserModel(),
];
