import { UserModel } from '@/domain/models';

import { faker } from '@faker-js/faker';

export const mockUserModel = (): UserModel => ({
  id: faker.datatype.number(),
  username: faker.lorem.word(),
  email: faker.internet.email(),
});
