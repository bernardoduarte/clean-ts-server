import faker from '@faker-js/faker';
import * as path from 'path';

export const mockWritableFilePath = () => {
  return path.join(__dirname, faker.system.fileName());
};
