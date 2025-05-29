import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe()); //

  const host = process.env.HOST ?? 3001;
  const port = process.env.PORT ?? 'localhost';

  await app.listen(port);
  console.log(`App running on ${host}:${port}`);
}
bootstrap();
