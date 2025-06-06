import { DataSourceOptions } from 'typeorm';
import { Challenge } from '../entities/challenge.entity';
import { Member } from '../entities/member.entity';
import { MemberChallenge } from '../entities/memberChallenge.entity';
import { BasePostgresConfig } from './base-postgres.config';
import { Admin } from '../entities/admin.entity';

export class MigrationsDataSourceConfig extends BasePostgresConfig {
  readonly entities: DataSourceOptions['entities'];
  readonly migrations: DataSourceOptions['migrations'];
  readonly migrationsRun: boolean;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    super(env);
    this.entities = [Member, Admin, Challenge, MemberChallenge];
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
