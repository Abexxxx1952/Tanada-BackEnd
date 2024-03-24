import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { PhotosModule } from './photo/photos.module';
import { StatsModule } from './stat/stats.module';

@Module({
  imports: [UsersModule, PhotosModule, StatsModule],
  controllers: [],
  providers: [],
})
export class DomainModule {}
