import { Controller } from '@/presentation/protocols';
import { Controller as NestController, Res, Type } from '@nestjs/common';
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
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
      }
    }
  }
  return NestControllerAdapter;
}

export namespace adaptControllerTypes {
  export type Method = (path?: string | string[]) => MethodDecorator;
  export type Route = string | string[];
}
