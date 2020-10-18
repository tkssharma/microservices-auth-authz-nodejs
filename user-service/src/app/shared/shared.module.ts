import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { LoggerModule } from '../../logger/logger.module';
import AuthorizationService from './services/authorization-service';
@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
  controllers: [],
})
export class SharedModule { }
