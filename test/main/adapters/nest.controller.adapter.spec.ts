import { adaptController } from '@/main/adapters';
import { noContent, ok } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { Get } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

const mockOkHttpResponse = (): HttpResponse => {
  return ok({});
};

const mockNoContentHttpResponse = (): HttpResponse => {
  return noContent();
};
class ControllerSpy implements Controller {
  response: HttpResponse;
  callCount = 0;

  async handle(): Promise<HttpResponse> {
    this.callCount++;
    return this.response;
  }
}

describe('NestControllerAdapter', () => {
  // TODO: test diferent http methods, mock the endpoint path, test endpoint path, etc...
  test('Should call Controller handle', async () => {
    const controllerSpy = new ControllerSpy();
    controllerSpy.response = mockOkHttpResponse();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [adaptController(Get, '', controllerSpy)],
    }).compile();
    const app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer()).get('');
    expect(controllerSpy.callCount).toBe(1);
  });

  test('Should return 200 if controller returns HttpResponse statusCode 200', async () => {
    const controllerSpy = new ControllerSpy();
    controllerSpy.response = mockOkHttpResponse();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [adaptController(Get, '', controllerSpy)],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer()).get('').expect(200).expect({});
  });

  test('Should return 204 if controller returns HttpResponse statusCode 204', async () => {
    const controllerSpy = new ControllerSpy();
    controllerSpy.response = mockNoContentHttpResponse();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [adaptController(Get, '', controllerSpy)],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    const response = await request(app.getHttpServer()).get('');
    await request(app.getHttpServer()).get('').expect(204).expect({});
  });
});
