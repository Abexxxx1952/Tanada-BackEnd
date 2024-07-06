import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PhotoEntity } from '../photo/entity/photo.entity';
import { PhotosRepository } from './repository/photos.repository';
import { PaginationParams } from '../../database/abstractRepository/paginationDto/pagination.dto';
import { FindPhotoByConditionsDto } from './dto/findByConditions.dto';
import { FindOnePhotoWithConditionsDto } from './dto/findWithConditions.dto';
import { UpdateResult } from '../../database/abstractRepository/types/updateResult';
import { CreateSignedUploadUrlResult } from './types/createSignedUploadUrlResult';
import { CurrentUser } from '../../common/decorators/currentUser.decorator';
import { CreateSignedUploadUrlDto } from './dto/createSignedUploadUrl.dto';
import { CreatePhotoDto } from './dto/create.dto';
import { UpdatePhotoDto } from './dto/update.dto';
import { PhotoGqlModel } from './gql/model/photo';
import { PhotoPaginationParamsGqlArgs } from './gql/args/pagination.args';
import { FindPhotoByConditionsGqlArgs } from './gql/args/findPhotoByConditions.args';
import { FindOnePhotoWithConditionsGqlArgs } from './gql/args/findWithConditions.args';
import { CreateSignedUploadUrlGqlArgs } from './gql/args/createSignedUploadUrl.args';
import { CreateSignedUploadUrlResultGqlModel } from './gql/model/createSignedUploadUrlResult';
import { CreatePhotoGqlArgs } from './gql/args/createPhoto.args';
import { UpdatePhotoGqlArgs } from './gql/args/updatePhoto.args';
import { UpdatePhotoResultGqlModel } from './gql/model/updateResult';

@Resolver(() => PhotoGqlModel)
export class PhotosResolver {
  constructor(
    @Inject('PhotosRepository')
    private readonly photosRepository: PhotosRepository,
  ) {}

  @Query(() => [PhotoGqlModel], { name: 'getPhotos', nullable: true })
  async getPhotos(
    @Args() { offset, limit }: PhotoPaginationParamsGqlArgs,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAll(offset, limit);
  }

  @Query(() => PhotoGqlModel, { name: 'getPhotoById', nullable: true })
  async getPhotoOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneById(id);
  }

  @Query(() => PhotoGqlModel, { name: 'getPhotoOneBy', nullable: true })
  async getPhotoOneBy(
    @Args() condition: FindPhotoByConditionsGqlArgs,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneByCondition(condition);
  }

  @Query(() => [PhotoGqlModel], { name: 'getPhotoManyBy', nullable: true })
  async getPhotoManyBy(
    @Args() condition: FindPhotoByConditionsGqlArgs,
    @Args() { offset, limit }: PhotoPaginationParamsGqlArgs,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAllByCondition(
      condition,
      offset,
      limit,
    );
  }

  @Query(() => PhotoGqlModel, { name: 'getPhotoOneWith', nullable: true })
  async getPhotoOneWith(
    @Args() condition: FindOnePhotoWithConditionsGqlArgs,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneWithCondition(condition);
  }

  @Mutation(() => CreateSignedUploadUrlResultGqlModel, {
    name: 'createSignedUploadUrl',
  })
  async createSignedUploadUrl(
    @CurrentUser('id') currentUserId: string,
    @Args() createSignedUploadUrl: CreateSignedUploadUrlGqlArgs,
  ): Promise<CreateSignedUploadUrlResult> {
    return await this.photosRepository.createSignedUploadUrl(
      currentUserId,
      createSignedUploadUrl,
    );
  }

  @Mutation(() => PhotoGqlModel, {
    name: 'createPhoto',
  })
  async createPhoto(
    @CurrentUser('id') currentUserId: string,
    @Args() createPhoto: CreatePhotoGqlArgs,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.createPhoto(currentUserId, createPhoto);
  }

  @Mutation(() => PhotoGqlModel, {
    name: 'updatePhotoHard',
  })
  async updatePhotoHard(
    @CurrentUser('id') currentUserId: string,
    @Args() updatePhoto: UpdatePhotoGqlArgs,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.updateOnePhotoByIdHard(
      currentUserId,
      updatePhoto,
    );
  }

  @Mutation(() => UpdatePhotoResultGqlModel, {
    name: 'updatePhotoSoft',
  })
  async updatePhotoSoft(
    @CurrentUser('id') currentUserId: string,
    @Args() updatePhoto: UpdatePhotoGqlArgs,
  ): Promise<UpdateResult> {
    return await this.photosRepository.updateOnePhotoByIdSoft(
      currentUserId,
      updatePhoto,
    );
  }

  @Mutation(() => PhotoGqlModel, {
    name: 'deletePhoto',
  })
  async deletePhoto(
    @CurrentUser('id') currentUserId: string,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.removePhotoById(currentUserId, id);
  }
}
