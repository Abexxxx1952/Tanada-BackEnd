import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { UserWithRelationsService } from './userWithRelations.service';
import { UsersRepository } from 'src/domain/user/repository/users.repository';
import { PhotosRepository } from 'src/domain/photo/repository/photos.repository';
import { PhotoEntity } from 'src/domain/photo/entity/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PhotoEntity])],

  providers: [
    UserWithRelationsService,
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'PhotosRepository',
      useClass: PhotosRepository,
    },
  ],
  exports: [UserWithRelationsService],
})
export class UserWithRelationsModule {}
