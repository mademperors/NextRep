import { DataSourceOptions } from 'typeorm';
import { BaseConfig, loadBaseConfig } from './base.config';

export function loadDataSourceConfig(env: NodeJS.ProcessEnv = process.env): DataSourceOptions {
  const base: BaseConfig = loadBaseConfig(env);
  return {
    ...base,
    entities: [], //pass specific entities to create specific migration
    migrations: ['src/database/migrations/*.ts'],
    migrationsRun: false,
  };
}
