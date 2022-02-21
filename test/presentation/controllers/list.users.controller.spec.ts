import { ListUsersController } from '@/presentation/controllers';
import { ok } from '@/presentation/helpers';
import { ListUsersSpy } from '../mocks';

type SutTypes = {
  sut: ListUsersController;
  listUsersSpy: ListUsersSpy;
};

const makeSut = (): SutTypes => {
  const listUsersSpy = new ListUsersSpy();
  const sut = new ListUsersController(listUsersSpy);
  return {
    sut,
    listUsersSpy,
  };
};

describe('ListUsersController', () => {
  test('Should call ListUsers', async () => {
    const { sut, listUsersSpy } = makeSut();

    await sut.handle();

    expect(listUsersSpy.callCount).toBe(1);
  });

  test('Should return 200 on success', async () => {
    const { sut, listUsersSpy } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(listUsersSpy.output));
  });
});
