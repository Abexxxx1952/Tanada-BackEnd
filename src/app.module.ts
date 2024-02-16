import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './configs/env.validate';
import { DomainModule } from './domain/domain.module';
import { DatabaseModule } from './database/databaseNestjsTypeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validate,
    }),
    DatabaseModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
