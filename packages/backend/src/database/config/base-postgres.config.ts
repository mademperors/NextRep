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
    this.host = process.env.POSTGRES_HOST ?? 'localhost';
    this.port = Number(process.env.POSTGRES_PORT) || 5432;
    this.username = process.env.POSTGRES_USER || '';
    this.password = process.env.POSTGRES_PASSWORD || 'password';
    this.database = process.env.POSTGRES_DB ?? 'nextrep';
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
