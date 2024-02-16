import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './entity/photo.entity';

import { PhotosRepository } from './repository/photos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  controllers: [PhotoController],
  providers: [
    {
      provide: 'PhotosRepository',
      useClass: PhotosRepository,
    },
  ],
  exports: [],
})
export class PhotosModule {}
