import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UsersRepository } from './repository/users.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
  exports: ['UsersRepository'],
})
export class UsersModule {}
