import { ListUsers } from '@/domain/usecases';

export interface ListUsersRepository {
  listUsers: () => Promise<ListUsersRepository.Output>;
}

export namespace ListUsersRepository {
  export type Output = ListUsers.Output;
}
