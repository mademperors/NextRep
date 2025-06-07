import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/database/entities/admin.entity';
import { AdminsRepository } from './admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminsRepository],
  exports: [AdminsRepository],
})
export class AdminsModule {}
