import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { createDocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();
import 'reflect-metadata';
(async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  const configService = app.get(ConfigService);
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(configService.get().port);
  console.info('SERVER IS RUNNING ON PORT', configService.get().port);
})();
