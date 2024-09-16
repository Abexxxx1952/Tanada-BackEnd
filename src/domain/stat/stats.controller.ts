import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
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
  ApiStatsGetPhotosByDate,
  ApiStatsGetUsersByDate,
  ApiStatsGetPhotosById,
  ApiStatsGetPhotosByDateById,
  ApiStatsGetPhotosForLast7DaysById,
  ApiStatsGetPhotosForLast7Days,
  ApiStatsGetPhotosForCurrentMonthByWeekById,
  ApiStatsGetPhotosForCurrentMonthByWeek,
  ApiStatsGetPhotosForCurrentYearByMonthById,
  ApiStatsGetPhotosForCurrentYearByMonth,
} from '../../swagger/stats';
import { FindStatsByDateDto } from './dto/findStatsByDate.dto';

@ApiTags('v1/stats')
@Controller('v1/stats')
export class StatController {
  constructor(
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    @Inject('PhotoStatsRepository')
    private readonly photoStatsRepository: PhotoStatsRepository,
  ) {}

  @Get('usersStats')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetUsers()
  async getUsersStats(): Promise<UsersStatsResult> {
    return await this.userStatsRepository.getUsersStats();
  }

  @Get('usersStatsByDate')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetUsersByDate()
  async getUsersStatsByDate(
    @Query() condition: { condition: string },
  ): Promise<UsersStatsResult> {
    let parsedCondition: FindStatsByDateDto;
    try {
      parsedCondition =
        await this.userStatsRepository.parsedCondition<FindStatsByDateDto>(
          condition,
          FindStatsByDateDto,
        );
    } catch (error) {
      throw error;
    }

    return await this.userStatsRepository.getUsersStatsByDate(
      parsedCondition.startDate,
      parsedCondition.endDate,
    );
  }

  @Get('photosStats')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotos()
  async getPhotosStats(): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStats();
  }

  @Get('photosStatsById/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosById()
  async getPhotosStatsById(
    @Param('id') id: string,
  ): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStatsById(id);
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

  @Get('photosStatsByDate')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosByDate()
  async getPhotosStatsByDate(
    @Query() condition: { condition: string },
  ): Promise<PhotosStatsResult> {
    let parsedCondition: FindStatsByDateDto;
    try {
      parsedCondition =
        await this.photoStatsRepository.parsedCondition<FindStatsByDateDto>(
          condition,
          FindStatsByDateDto,
        );
    } catch (error) {
      throw error;
    }

    return await this.photoStatsRepository.getPhotosStatsByDate(
      parsedCondition.startDate,
      parsedCondition.endDate,
    );
  }

  @Get('photosStatsByDateById/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosByDateById()
  async getPhotosStatsByDateById(
    @Param('id') id: string,
    @Query() condition: { condition: string },
  ): Promise<PhotosStatsResult> {
    let parsedCondition: FindStatsByDateDto;
    try {
      parsedCondition =
        await this.photoStatsRepository.parsedCondition<FindStatsByDateDto>(
          condition,
          FindStatsByDateDto,
        );
    } catch (error) {
      throw error;
    }

    return await this.photoStatsRepository.getPhotosStatsByDateById(
      id,
      parsedCondition.startDate,
      parsedCondition.endDate,
    );
  }

  @Get('getPhotosStatsForCurrentYearByMonth')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosForCurrentYearByMonth()
  async getPhotosStatsForCurrentYearByMonth(): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentYearByMonth();
  }

  @Get('getPhotosStatsForCurrentYearByMonthById/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosForCurrentYearByMonthById()
  async getPhotosStatsForCurrentYearByMonthById(
    @Param('id') id: string,
  ): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentYearByMonthById(
      id,
    );
  }

  @Get('getPhotosStatsForCurrentMonthByWeek')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosForCurrentMonthByWeek()
  async getPhotosStatsForCurrentMonthByWeek(): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentMonthByWeek();
  }

  @Get('getPhotosStatsForCurrentMonthByWeekById/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosForCurrentMonthByWeekById()
  async getPhotosStatsForCurrentMonthByWeekById(
    @Param('id') id: string,
  ): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentMonthByWeekById(
      id,
    );
  }

  @Get('getPhotosStatsForLast7Days')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosForLast7Days()
  async getPhotosStatsForLast7Days(): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForLast7Days();
  }

  @Get('getPhotosStatsForLast7DaysById/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiStatsGetPhotosForLast7DaysById()
  async getPhotosStatsForLast7DaysById(
    @Param('id') id: string,
  ): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForLast7DaysById(id);
  }
}
