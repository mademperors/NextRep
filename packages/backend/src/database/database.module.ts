import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(new TypeOrmConfig().toTypeOrmModuleOptions())],
})
export class DatabaseModule {}
