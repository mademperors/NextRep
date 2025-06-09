import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/database/entities/admin.entity';
import { AdminsController } from './admin.controller';
import { AdminsRepository } from './admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminsRepository],
  exports: [AdminsRepository],
})
export class AdminsModule {}
