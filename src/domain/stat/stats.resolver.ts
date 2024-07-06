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

@Resolver(() => UserStatGqlModel || PhotoStatGqlModel)
export class StatsResolver {
  constructor(
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    @Inject('PhotoStatsRepository')
    private readonly photoStatsRepository: PhotoStatsRepository,
  ) {}

  @Query(() => [UsersStatsResultGqlModel], {
    name: 'getUsersStats',
    nullable: true,
  })
  async getUsersStats(): Promise<UsersStatsResult> {
    return await this.userStatsRepository.getUsersStats();
  }

  @Query(() => PhotosStatsResultGqlModel, {
    name: 'getPhotosStats',
    nullable: true,
  })
  async getPhotosStats(): Promise<PhotosStatsResult> {
    return await this.photoStatsRepository.getPhotosStats();
  }

  @Mutation(() => PhotoStatGqlModel, {
    name: 'addViewsPhotoStats',
  })
  async addViewsPhotoStats(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PhotoStatEntity> {
    return await this.photoStatsRepository.addViewsPhotoStat(id);
  }
}
