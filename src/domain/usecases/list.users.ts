import { UserModel } from '../models';

export interface ListUsers {
  listUsers: () => Promise<ListUsers.Output>;
}

export namespace ListUsers {
  export type Output = UserModel[];
}
