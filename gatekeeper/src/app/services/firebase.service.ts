import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as util from 'util';
import { ConfigService } from '../../config/config.service';
import * as CONSTANT from '../constants.api';
import * as admin from 'firebase-admin';
import { RedisCacheService } from './redis.service';
import { Logger } from '../../logger/logger';

@Injectable()
export class FirebaseAuthService {

  constructor(
    private configService: ConfigService,
    private logger: Logger,
    private redisCacheService: RedisCacheService,
  ) { }

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }

  private buildKey(email, authToken): string {
    return `${email}-${authToken.split('.')[2]}`
  }

  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(tokenString);
      const newKey = this.buildKey(decodedToken.email, tokenString);
      this.redisCacheService.ResetKeys(decodedToken.email, newKey, decodedToken);
      this.logger.info(`dat received after token validation  ${JSON.stringify(decodedToken)}`);
      return { uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };
    } catch (err) {
      throw new UnauthorizedException(CONSTANT.INVALID_AUTH_TOKEN);
    }
  }
  // post auth once user start hitting protected apis //
  public async validate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(tokenString);
      const key = this.buildKey(tokenString, decodedToken.email)
      // authenticate will store session data on user login //
      // this will get called whenever user is doing login //
      this.logger.info('validating user session from redis');
      const data = await this.redisCacheService.get(key);
      if(!data){
        throw new UnauthorizedException(CONSTANT.INVALID_SESSION_IN_REDIS);
      }
      return { uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };
    } catch (err) {
      throw new UnauthorizedException(CONSTANT.INVALID_AUTH_TOKEN);
    }
  }
}
