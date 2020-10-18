import { MiddlewareConsumer, Module, NestModule, RequestMethod, Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../logger/logger.module';
import { AuthMiddleware } from '../../core/middleware';
import { DatabaseModule } from '../../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { UserController } from './controller/user.controller';
import { UserSchema } from './entity/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [
    LoggerModule,
    SharedModule,
    DatabaseModule.forRoot(),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [UserService, AuthMiddleware],
  exports : [UserService],
  controllers: [UserController]
})
export class EntityModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: '/api/v1/user', method: RequestMethod.ALL});
  }
}
