import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { EntityModule } from './app/user/entity.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './app/shared/shared.module';
@Module({
  imports: [
    DatabaseModule.forRoot(),
    ConfigModule,
    EntityModule,
    LoggerModule,
    SharedModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
