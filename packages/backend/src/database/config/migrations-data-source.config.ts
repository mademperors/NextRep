import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { Member } from '../entities/member.entity';
import { Training } from '../entities/training.entity';
import { BasePostgresConfig } from './base-postgres.config';

export class MigrationsDataSourceConfig extends BasePostgresConfig {
  readonly entities: DataSourceOptions['entities'];
  readonly migrations: DataSourceOptions['migrations'];
  readonly migrationsRun: boolean;

  constructor() {
    super();
    this.entities = [Training, Member];
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
