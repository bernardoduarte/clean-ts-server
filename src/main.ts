import { NestFactory } from '@nestjs/core';
import { MainModule } from '@/main/module';

async function bootstrap() {
  const nest = await NestFactory.create(MainModule);
  await nest.listen(3000);
}
bootstrap();
