import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalStorageService } from './externalStorage.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ExternalStorageService],
  exports: [ExternalStorageService],
})
export class ExternalStorageModule {}
