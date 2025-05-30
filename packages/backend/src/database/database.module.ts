import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadTypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(loadTypeOrmConfig())],
})
export class DatabaseModule {}
