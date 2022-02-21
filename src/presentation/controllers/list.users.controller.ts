import { ListUsers } from '@/domain/usecases';
import { Controller } from '../protocols';

export class ListUsersController implements Controller {
  constructor(private readonly listUsersFileRepository: ListUsers) {}

  async handle(): Promise<any> {
    return this.listUsersFileRepository.listUsers();
  }
}
