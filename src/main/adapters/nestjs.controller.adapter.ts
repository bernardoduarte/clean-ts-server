import { Controller } from '@/presentation/protocols';
import { Controller as NestController, Type } from '@nestjs/common';

export function adaptController(
  method: adaptControllerTypes.Method,
  route: adaptControllerTypes.Route,
  controllerInstance: Controller,
): Type<any> {
  @NestController(route)
  class NestControllerAdapter {
    private controller: Controller = controllerInstance;

    @method()
    handle() {
      return this.controller.handle();
    }
  }
  return NestControllerAdapter;
}

export namespace adaptControllerTypes {
  export type Method = (path?: string | string[]) => MethodDecorator;
  export type Route = string | string[];
}
