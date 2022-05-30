import { Controller } from '@/presentation/protocols';
import {
  Controller as NestController,
  HttpException,
  Res,
  Type,
} from '@nestjs/common';
import { Response } from 'express';

export function adaptController(
  method: adaptControllerTypes.Method,
  route: adaptControllerTypes.Route,
  controllerInstance: Controller,
): Type<any> {
  @NestController(route)
  class NestControllerAdapter {
    private controller: Controller = controllerInstance;

    @method()
    async handle(@Res() res: Response) {
      const httpResponse = await this.controller.handle();
      switch (httpResponse.statusCode) {
        case 200: {
          res.status(httpResponse.statusCode).json(httpResponse.body);
          break;
        }
        case 204: {
          res.status(httpResponse.statusCode).json();
          break;
        }
        default:
          throw new HttpException(httpResponse.body.message, 500);
      }
    }
  }
  return NestControllerAdapter;
}

export namespace adaptControllerTypes {
  export type Method = (path?: string | string[]) => MethodDecorator;
  export type Route = string | string[];
}
