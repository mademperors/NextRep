import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { AccountChallenge } from '../entities/account-challenge.entity';
import { Account } from '../entities/account.entity';
import { Admin } from '../entities/admin.entity';
import { Challenge } from '../entities/challenge.entity';
import { Member } from '../entities/member.entity';
import { Training } from '../entities/training.entity';
import { BasePostgresConfig } from './base-postgres.config';

export class MigrationsDataSourceConfig extends BasePostgresConfig {
  readonly entities: DataSourceOptions['entities'];
  readonly migrations: DataSourceOptions['migrations'];
  readonly migrationsRun: boolean;

  constructor() {
    super();
    this.entities = [Account, Challenge, AccountChallenge, Member, Training, Admin];
    this.migrations = ['src/database/migrations/v2/*.ts'];
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
