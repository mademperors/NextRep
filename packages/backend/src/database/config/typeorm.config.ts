import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseConfig, loadBaseConfig } from './base.config';

export function loadTypeOrmConfig(env: NodeJS.ProcessEnv = process.env): TypeOrmModuleOptions {
  const base: BaseConfig = loadBaseConfig(env);
  return {
    ...base,
    autoLoadEntities: true,
    retryAttempts: 3,
  };
}
