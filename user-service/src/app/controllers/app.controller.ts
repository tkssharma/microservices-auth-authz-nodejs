import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api/v1')
export class AppController {

  @Get('/health')
  getHealthCheck() {
    return {
      status: 'ok from user Service'
    };
  }
}
