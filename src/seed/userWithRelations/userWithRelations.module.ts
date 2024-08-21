import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { UserWithRelationsService } from './userWithRelations.service';
import { UsersRepository } from '../../domain/user/repository/users.repository';
import { PhotosRepository } from '../../domain/photo/repository/photos.repository';
import { PhotoEntity } from '../../domain/photo/entity/photo.entity';
import { UserStatsRepository } from '../../domain/stat/repository/userStats.repository';
import { PhotoStatsRepository } from '../../domain/stat/repository/photoStats.repository';
import { ExternalStorageService } from '../../externalStorage/externalStorage.service';
import { UserStatEntity } from '../../domain/stat/entity/userStat.entity';
import { PhotoStatEntity } from '../../domain/stat/entity/photoStat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PhotoEntity,
      UserStatEntity,
      PhotoStatEntity,
    ]),
    ConfigModule,
  ],

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
    {
      provide: 'UserStatsRepository',
      useClass: UserStatsRepository,
    },
    {
      provide: 'PhotoStatsRepository',
      useClass: PhotoStatsRepository,
    },
    ExternalStorageService,
  ],
  exports: [UserWithRelationsService],
})
export class UserWithRelationsModule {}
