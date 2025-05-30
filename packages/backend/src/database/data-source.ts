import { DataSource } from 'typeorm';
import { loadDataSourceConfig } from './config/data-source.config';

const AppDataSource = new DataSource(loadDataSourceConfig());

export default AppDataSource;
