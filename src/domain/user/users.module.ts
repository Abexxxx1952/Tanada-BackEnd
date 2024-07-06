import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UsersRepository } from './repository/users.repository';
import { AuthModule } from './auth/auth.module';
import { StatsModule } from '../stat/stats.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, StatsModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
    UsersResolver,
  ],
  exports: ['UsersRepository'],
})
export class UsersModule {}
