import { ListUsersController } from '@/presentation/controllers';
import { noContent, ok } from '@/presentation/helpers';
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

  test('Should return 204 if ListUsers returns empty', async () => {
    const { sut, listUsersSpy } = makeSut();
    listUsersSpy.output = [];

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(noContent());
  });
});
