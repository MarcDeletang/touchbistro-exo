import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { cors } from './config';

export const getApp = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  return app;
};

export async function bootstrap(app: INestApplication) {
  app.enableCors({
    origin: cors,
  });
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, transform: true }),
  );
}

export async function start(app: INestApplication) {
  await app.listen(3001);
}
