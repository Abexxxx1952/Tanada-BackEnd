import { Module } from '@nestjs/common';
import { ExternalStorageService } from './externalStorage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ExternalStorageService],
  exports: [ExternalStorageService],
})
export class ExternalStorageModule {}
