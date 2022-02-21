import { ListUsersController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeFileListUsers } from '..';

export const makeListUsersController = (): Controller => {
  return new ListUsersController(makeFileListUsers());
};
