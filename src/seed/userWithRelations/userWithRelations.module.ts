import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { UserWithRelationsService } from './userWithRelations.service';
import { UsersRepository } from 'src/domain/user/repository/users.repository';
import { PhotosRepository } from 'src/domain/photo/repository/photos.repository';
import { PhotoEntity } from 'src/domain/photo/entity/photo.entity';
import { UserStatsRepository } from 'src/domain/stat/repository/userStats.repository';
import { PhotoStatsRepository } from 'src/domain/stat/repository/photoStats.repository';
import { ExternalStorageService } from 'src/externalStorage/externalStorage.service';
import { UserStatEntity } from 'src/domain/stat/entity/userStat.entity';
import { PhotoStatEntity } from 'src/domain/stat/entity/photoStat.entity';
import { ConfigModule } from '@nestjs/config';

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
