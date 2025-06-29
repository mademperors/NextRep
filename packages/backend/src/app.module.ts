import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';
import { RepositoryModule } from './repositories/repository.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { LLMModule } from './llm/llm-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    RepositoryModule,
    SchedulerModule,
    LLMModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
