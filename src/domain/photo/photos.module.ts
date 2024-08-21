import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoController } from './photos.controller';
import { PhotoEntity } from './entity/photo.entity';
import { PhotosRepository } from './repository/photos.repository';
import { UsersModule } from '../user/users.module';
import { ExternalStorageModule } from '../../externalStorage/externalStorage.module';
import { StatsModule } from '../stat/stats.module';
import { PhotosResolver } from './photos.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhotoEntity]),
    UsersModule,
    ExternalStorageModule,
    StatsModule,
    ConfigModule,
  ],
  controllers: [PhotoController],
  providers: [
    {
      provide: 'PhotosRepository',
      useClass: PhotosRepository,
    },
    PhotosResolver,
  ],
  exports: [],
})
export class PhotosModule {}
