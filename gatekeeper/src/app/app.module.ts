import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { CacheModule } from '../redis/cache.module';
import { RedisCacheService } from './services/redis.service';
import { FirebaseAuthService } from './services/firebase.service';

@Module({
  imports: [ConfigModule, LoggerModule, CacheModule],
  controllers: [AppController, AuthController],
  providers: [RedisCacheService, FirebaseAuthService],
  exports: [RedisCacheService, FirebaseAuthService]
})
export class AppModule {}
