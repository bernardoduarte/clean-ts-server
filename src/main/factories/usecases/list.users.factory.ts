import { FileListUsers } from '@/data/usecases';
import { ListUsers } from '@/domain/usecases';
import { ListUsersFileRepository } from '@/infra/file';

export const makeFileListUsers = (): ListUsers => {
  const listUsersFileRepository = new ListUsersFileRepository();
  return new FileListUsers(listUsersFileRepository);
};
