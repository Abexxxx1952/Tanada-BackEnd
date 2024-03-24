import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { PhotoStatEntity } from './entity/photoStat.entity';

import { UserStatsRepository } from './repository/userStats.repository';
import { PhotoStatsRepository } from './repository/photoStats.repository';

import {
  CacheOptions,
  UseInterceptorsCacheInterceptor,
} from 'src/common/interceptors/cache.interceptor';

import { ApiTags } from '@nestjs/swagger';
import {
  ApiStatsGetUsers,
  ApiStatsGetPhotos,
  ApiStatsPostAddPhotoView,
} from '../../swagger/stats';

@ApiTags('v1/stats')
@Controller('v1/stats')
export class StatController {
  constructor(
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    @Inject('PhotoStatsRepository')
    private readonly photoStatsRepository: PhotoStatsRepository,
  ) {}

  @Get('users')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetUsers()
  async getUsersStats(): Promise<{
    created: number;
    deleted: number;
  }> {
    return await this.userStatsRepository.getUsersStats();
  }

  @Get('photos')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotos()
  async getPhotosStats(): Promise<{
    created: number;
    views: number;
    deleted: number;
  }> {
    return await this.photoStatsRepository.getPhotosStats();
  }

  @Post('addPhotoView')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptorsCacheInterceptor({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/stats/photos'],
  })
  @ApiStatsPostAddPhotoView()
  async addViewsPhotoStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PhotoStatEntity> {
    return await this.photoStatsRepository.viewsPhotoStat(id);
  }
}
