import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { PhotosModule } from './photo/photos.module';

@Module({
  imports: [UsersModule, PhotosModule],
  controllers: [],
  providers: [],
})
export class DomainModule {}
