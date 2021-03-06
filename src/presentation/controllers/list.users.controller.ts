import { ListUsers } from '@/domain/usecases';
import { noContent, ok, serverError } from '../helpers';
import { Controller, HttpResponse } from '../protocols';

export class ListUsersController implements Controller {
  constructor(private readonly listUsersFileRepository: ListUsers) {}

  async handle(): Promise<HttpResponse> {
    try {
      const users = await this.listUsersFileRepository.listUsers();
      return users.length ? ok(users) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
