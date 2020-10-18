import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
   @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async get(key: string) {
     return await this.cache.get(key);
  }
  async ResetKeys(oldkeyPattern: string, newKey: string, data: object){
   const keys = await this.cache.keys(`${oldkeyPattern}-*`);
    for(let i of keys){
      await this.cache.del(i);
    }
    await this.set(newKey, data);
  }
  async set(key: string, value: object) {
   await this.cache.set(key, value);
  }
  async del(key, value) {
   await this.cache.del(key);
  }
}
