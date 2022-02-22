import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '@/main/module';
import { getWritableFilePath } from 'test/infra/mocks';
import { FileHelper } from '@/infra/file/users/file-helper';
import { mockListUsersOutput } from 'test/domain/mocks';

describe('User routes', () => {
  let app: INestApplication;
  let mockedUsersFile: string;

  beforeEach(async () => {
    mockedUsersFile = getWritableFilePath();
    process.env.USERS_FILE = mockedUsersFile;
    await FileHelper.createFile(mockedUsersFile);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    try {
      await FileHelper.deleteFile(mockedUsersFile);
    } catch (error) {}
  });

  describe('GET /users', () => {
    test('Should return 200 on list users', async () => {
      await FileHelper.writeJsonFile(mockedUsersFile, mockListUsersOutput());
      await request(app.getHttpServer()).get('/users').expect(200);
    });

    test('Should return 204 on empty list of users', async () => {
      await FileHelper.writeJsonFile(mockedUsersFile, []);
      await request(app.getHttpServer()).get('/users').expect(204);
    });
  });
});
