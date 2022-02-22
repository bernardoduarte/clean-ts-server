import faker from '@faker-js/faker';
import * as path from 'path';

export const getWritableFilePath = () => {
  return path.join(__dirname, faker.system.fileName());
};
