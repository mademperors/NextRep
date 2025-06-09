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

  constructor() {
    this.host = process.env.DB_HOST ?? 'localhost';
    this.port = Number(process.env.DB_PORT) || 5432;
    this.username = process.env.DB_USER || '';
    this.password = process.env.DB_PASSWORD || '';
    this.database = process.env.DB_NAME ?? 'nextrep';
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
