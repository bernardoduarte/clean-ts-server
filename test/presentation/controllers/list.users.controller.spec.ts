import { ListUsersController } from '@/presentation/controllers';
import { ListUsersSpy } from '../mocks';

describe('ListUsersController', () => {
  test('Should call ListUsers', async () => {
    const listUsersSpy = new ListUsersSpy();
    const sut = new ListUsersController(listUsersSpy);

    await sut.handle();

    expect(listUsersSpy.callCount).toBe(1);
  });
});
