import { DataSourceOptions } from 'typeorm';
import { BasePostgresConfig } from './base-postgres.config';

export class MigrationsDataSourceConfig extends BasePostgresConfig {
  readonly entities: DataSourceOptions['entities'];
  readonly migrations: DataSourceOptions['migrations'];
  readonly migrationsRun: boolean;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    super(env);
    this.entities = [];
    this.migrations = ['src/database/migrations/*.ts'];
    this.migrationsRun = false;
  }

  override toDataSourceOptions(): DataSourceOptions {
    return {
      ...super.toDataSourceOptions(),
      entities: this.entities,
      migrations: this.migrations,
      migrationsRun: this.migrationsRun,
    };
  }
}
