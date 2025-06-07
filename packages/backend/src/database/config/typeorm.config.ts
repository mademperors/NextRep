import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BasePostgresConfig } from './base-postgres.config';

export class TypeOrmConfig extends BasePostgresConfig {
  readonly autoLoadEntities: boolean;
  readonly retryAttempts: number;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    super(env);
    this.autoLoadEntities = true;
    this.retryAttempts = 3;
  }

  toTypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      ...super.toDataSourceOptions(),
      autoLoadEntities: this.autoLoadEntities,
      retryAttempts: this.retryAttempts,
    };
  }
}
