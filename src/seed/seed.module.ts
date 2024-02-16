import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/databaseNestjsTypeorm.module';
import { Seeder } from './seed.service';
import { UserWithRelationsModule } from './userWithRelations/userWithRelations.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/configs/env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validate,
    }),
    DatabaseModule,
    UserWithRelationsModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
