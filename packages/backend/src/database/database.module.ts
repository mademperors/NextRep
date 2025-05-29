import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST') ?? 'localhost',
        port: config.get<number>('POSTGRES_PORT') ?? 5432,
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB') ?? 'nextrep',
        autoLoadEntities: true,
        synchronize: false,
        retryAttempts: 3,
      }),
    }),
  ],
})
export class DatabaseModule {}
