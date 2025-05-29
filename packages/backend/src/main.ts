import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = process.env.HOST ?? 3000;
  const port = process.env.PORT ?? 'localhost';

  await app.listen(port, () => {
    console.log(`App running on ${host}:${port}`);
  });
}
bootstrap();
