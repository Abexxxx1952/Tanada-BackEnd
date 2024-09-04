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
import { ApiTags } from '@nestjs/swagger';
import { PhotoStatEntity } from './entity/photoStat.entity';

import { UserStatsRepository } from './repository/userStats.repository';
import { PhotoStatsRepository } from './repository/photoStats.repository';

import {
  CacheOptions,
  UseInterceptorsCacheInterceptor,
} from '../../common/interceptors/cache.interceptor';

import { UsersStatsResult } from './types/usersStatsResult';
import { PhotosStatsResult } from './types/photosStatsResult';

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
  async getUsersStats(): Promise<UsersStatsResult> {
    return await this.userStatsRepository.getUsersStats();
  }

  @Get('photos')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotos()
  async getPhotosStats(): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStats();
  }

  @Post('addPhotoView/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptorsCacheInterceptor({ cache: CacheOptions.InvalidateAllCache })
  @ApiStatsPostAddPhotoView()
  async addViewsPhotoStats(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PhotoStatEntity> {
    return await this.photoStatsRepository.addViewsPhotoStat(id);
  }
}
