import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DBExceptionFilter } from './common/filters/db-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('NextRep/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new DBExceptionFilter(), new HttpExceptionFilter());
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NextRep API')
    .setDescription('The NextRep API documentation')
    .setVersion('1.0')
    .addTag('NextRep')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('NextRep/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const host = process.env.HOST ?? 3001;
  const port = process.env.PORT ?? 'localhost';

  await app.listen(port);
  console.log(`App running on ${host}:${port}`);
  console.log(`Swagger docs available at http://${host}:${port}/NextRep/api/docs`);
}
bootstrap();

