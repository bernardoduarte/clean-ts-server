import { Get, Module } from '@nestjs/common';
import { adaptController } from './adapters';
import { makeListUsersController } from './factories';

@Module({
  imports: [],
  controllers: [adaptController(Get, 'users', makeListUsersController())],
  providers: [],
})
export class MainModule {}
