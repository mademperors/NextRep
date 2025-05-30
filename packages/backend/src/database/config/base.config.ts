import 'dotenv/config';

export interface BaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

export function loadBaseConfig(env: NodeJS.ProcessEnv = process.env): BaseConfig {
  return {
    type: 'postgres',
    host: env.POSTGRES_HOST ?? 'localhost',
    port: Number(env.POSTGRES_PORT) || 5432,
    username: env.POSTGRES_USER || '',
    password: env.POSTGRES_PASSWORD || '',
    database: env.POSTGRES_DB ?? 'nextrep',
    synchronize: false,
  };
}
