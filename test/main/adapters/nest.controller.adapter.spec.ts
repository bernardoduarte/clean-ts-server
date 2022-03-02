
import { adaptController } from '@/main/adapters';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { Get } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

class ControllerSpy implements Controller {
  response: HttpResponse = {
    body: {},
    statusCode: 200,
  };
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [adaptController(Get, '', controllerSpy)],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer()).get('').expect(200);
  });
});
