import { ListUsers } from '@/domain/usecases';
import { ok } from '../helpers';
import { Controller, HttpResponse } from '../protocols';

export class ListUsersController implements Controller {
  constructor(private readonly listUsersFileRepository: ListUsers) {}

  async handle(): Promise<HttpResponse> {
    const users = await this.listUsersFileRepository.listUsers();
    return ok(users);
  }
}
