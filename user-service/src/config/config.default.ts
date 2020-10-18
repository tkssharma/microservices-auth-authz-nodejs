import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: '',
  port: 3000,
  logLevel: 'info',
  mongo: undefined,
  gatekeeperServiceUrl: undefined,
};
