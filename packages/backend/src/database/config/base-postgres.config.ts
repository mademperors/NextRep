import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export class BasePostgresConfig {
  readonly type = 'postgres';
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly synchronize: boolean;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    this.host = env.DB_HOST ?? 'localhost';
    this.port = Number(env.DB_PORT) || 5432;
    this.username = env.DB_USER || '';
    this.password = env.DB_PASSWORD || '';
    this.database = env.DB_NAME ?? 'nextrep';
    this.synchronize = false;
  }

  protected toDataSourceOptions(): DataSourceOptions {
    return {
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      synchronize: this.synchronize,
    };
  }
}
