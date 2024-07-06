import { Module } from '@nestjs/common';
import { PhotoController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './entity/photo.entity';
import { PhotosRepository } from './repository/photos.repository';
import { UsersModule } from '../user/users.module';
import { ExternalStorageModule } from 'src/externalStorage/externalStorage.module';
import { ConfigModule } from '@nestjs/config';
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
  exports: ['PhotosRepository'],
})
export class PhotosModule {}
