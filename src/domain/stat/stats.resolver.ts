import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UserStatsRepository } from './repository/userStats.repository';
import { PhotoStatsRepository } from './repository/photoStats.repository';
import { UserStatGqlModel } from './gql/model/userStat';
import { PhotoStatGqlModel } from './gql/model/photoStat';
import { UsersStatsResult } from './types/usersStatsResult';
import { UsersStatsResultGqlModel } from './gql/model/usersStatsResult';
import { PhotosStatsResult } from './types/photosStatsResult';
import { PhotosStatsResultGqlModel } from './gql/model/photosStatsResult';
import { PhotoStatEntity } from './entity/photoStat.entity';
import { FindStatsByDateGqlInput } from './gql/inputs/findStatsByDateGql.input';

@Resolver(() => UserStatGqlModel || PhotoStatGqlModel)
export class StatsResolver {
  constructor(
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    @Inject('PhotoStatsRepository')
    private readonly photoStatsRepository: PhotoStatsRepository,
  ) {}

  @Query(() => UsersStatsResultGqlModel, {
    name: 'getUsersStats',
    nullable: true,
  })
  async getUsersStats(): Promise<UsersStatsResult> {
    return await this.userStatsRepository.getUsersStats();
  }

  @Query(() => UsersStatsResultGqlModel, {
    name: 'getUsersStatsByDate',
    nullable: true,
  })
  async getUsersStatsByDate(
    @Args('condition') condition: FindStatsByDateGqlInput,
  ): Promise<UsersStatsResult> {
    return await this.userStatsRepository.getUsersStatsByDate(
      condition.startDate,
      condition.endDate,
    );
  }

  @Query(() => PhotosStatsResultGqlModel, {
    name: 'getPhotosStats',
    nullable: true,
  })
  async getPhotosStats(): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStats();
  }

  @Query(() => PhotosStatsResultGqlModel, {
    name: 'getPhotosStatsById',
    nullable: true,
  })
  async getPhotosStatsById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStatsById(id);
  }

  @Mutation(() => PhotoStatGqlModel, {
    name: 'addViewsPhotoStats',
  })
  async addViewsPhotoStats(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PhotoStatEntity> {
    return await this.photoStatsRepository.addViewsPhotoStat(id);
  }

  @Query(() => PhotosStatsResultGqlModel, {
    name: 'getPhotosStatsByDate',
    nullable: true,
  })
  async getPhotosStatsByDate(
    @Args('condition') condition: FindStatsByDateGqlInput,
  ): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStatsByDate(
      condition.startDate,
      condition.endDate,
    );
  }

  @Query(() => PhotosStatsResultGqlModel, {
    name: 'getPhotosStatsByDateById',
    nullable: true,
  })
  async getPhotosStatsByDateById(
    @Args('id', { type: () => String }) id: string,
    @Args('condition') condition: FindStatsByDateGqlInput,
  ): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStatsByDateById(
      id,
      condition.startDate,
      condition.endDate,
    );
  }

  @Query(() => [PhotosStatsResultGqlModel], {
    name: 'getPhotosStatsForCurrentYearByMonth',
    nullable: true,
  })
  async getPhotosStatsForCurrentYearByMonth(): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentYearByMonth();
  }

  @Query(() => [PhotosStatsResultGqlModel], {
    name: 'getPhotosStatsForCurrentYearByMonthById',
    nullable: true,
  })
  async getPhotosStatsForCurrentYearByMonthById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentYearByMonthById(
      id,
    );
  }

  @Query(() => [PhotosStatsResultGqlModel], {
    name: 'getPhotosStatsForCurrentMonthByWeek',
    nullable: true,
  })
  async getPhotosStatsForCurrentMonthByWeek(): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentMonthByWeek();
  }

  @Query(() => [PhotosStatsResultGqlModel], {
    name: 'getPhotosStatsForCurrentMonthByWeekById',
    nullable: true,
  })
  async getPhotosStatsForCurrentMonthByWeekById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForCurrentMonthByWeekById(
      id,
    );
  }

  @Query(() => [PhotosStatsResultGqlModel], {
    name: 'getPhotosStatsForLast7Days',
    nullable: true,
  })
  async getPhotosStatsForLast7Days(): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForLast7Days();
  }

  @Query(() => [PhotosStatsResultGqlModel], {
    name: 'getPhotosStatsForLast7DaysById',
    nullable: true,
  })
  async getPhotosStatsForLast7DaysById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PhotosStatsResult[]> {
    return await this.photoStatsRepository.getPhotosStatsForLast7DaysById(id);
  }
}
