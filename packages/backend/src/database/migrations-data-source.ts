import { DataSource } from 'typeorm';
import { MigrationsDataSourceConfig } from './config/migrations-data-source.config';

const migrationConfig = new MigrationsDataSourceConfig();
const MigrationsDataSource = new DataSource(migrationConfig.toDataSourceOptions());

export default MigrationsDataSource;
