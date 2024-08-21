import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PhotoEntity } from '../photo/entity/photo.entity';
import { PhotosRepository } from './repository/photos.repository';
import { UpdateResult } from '../../database/abstractRepository/types/updateResult';
import { CreateSignedUploadUrlResult } from './types/createSignedUploadUrlResult';
import { CurrentUserGql } from '../../common/decorators/currentUserGql.decorator';
import { PhotoGqlModel } from './gql/model/photo';
import { PhotoPaginationParamsGqlArgs } from './gql/args/pagination.args';
import { FindOnePhotoWithConditionsGqlInput } from './gql/inputs/findWithConditions.input';
import { CreateSignedUploadUrlGqlArgs } from './gql/args/createSignedUploadUrl.args';
import { CreateSignedUploadUrlResultGqlModel } from './gql/model/createSignedUploadUrlResult';
import { CreatePhotoGqlArgs } from './gql/args/createPhoto.args';
import { UpdatePhotoGqlArgs } from './gql/args/updatePhoto.args';
import { UpdatePhotoResultGqlModel } from './gql/model/updateResult';
import { FindPhotoByConditionsGqlInput } from './gql/inputs/findPhotoByConditions.input';
import { AccessTokenGqlAuthGuard } from '../user/auth/guards/gqlAccessToken.guard';
import { PermissionGuardGql } from '../../common/guard/permissionGql.guard';
import { PhotosPermission } from './permission/photos.permission.enum';

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
    return await this.photosRepository.findAll({
      skip: offset,
      take: limit,
    });
  }

  @Query(() => PhotoGqlModel, { name: 'getPhotoById', nullable: true })
  async getPhotoOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneById(id);
  }

  @Query(() => PhotoGqlModel, { name: 'getPhotoOneBy', nullable: true })
  async getPhotoOneBy(
    @Args('condition') condition: FindPhotoByConditionsGqlInput,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneByCondition(condition);
  }

  @Query(() => [PhotoGqlModel], { name: 'getPhotoManyBy', nullable: true })
  async getPhotoManyBy(
    @Args('condition') condition: FindPhotoByConditionsGqlInput,
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
    @Args('condition') condition: FindOnePhotoWithConditionsGqlInput,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneWithCondition(condition);
  }

  @Mutation(() => CreateSignedUploadUrlResultGqlModel, {
    name: 'createSignedUploadUrl',
  })
  @UseGuards(
    PermissionGuardGql([
      PhotosPermission.CreatePhoto,
      PhotosPermission.UpdatePhoto,
    ]),
  )
  @UseGuards(AccessTokenGqlAuthGuard)
  async createSignedUploadUrl(
    @CurrentUserGql('id') currentUserId: string,
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
  @UseGuards(PermissionGuardGql([PhotosPermission.CreatePhoto]))
  @UseGuards(AccessTokenGqlAuthGuard)
  async createPhoto(
    @CurrentUserGql('id') currentUserId: string,
    @Args() createPhoto: CreatePhotoGqlArgs,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.createPhoto(currentUserId, createPhoto);
  }

  @Mutation(() => PhotoGqlModel, {
    name: 'updatePhotoHard',
  })
  @UseGuards(PermissionGuardGql([PhotosPermission.UpdatePhoto]))
  @UseGuards(AccessTokenGqlAuthGuard)
  async updatePhotoHard(
    @CurrentUserGql('id') currentUserId: string,
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
  @UseGuards(PermissionGuardGql([PhotosPermission.UpdatePhoto]))
  @UseGuards(AccessTokenGqlAuthGuard)
  async updatePhotoSoft(
    @CurrentUserGql('id') currentUserId: string,
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
  @UseGuards(PermissionGuardGql([PhotosPermission.DeletePhoto]))
  @UseGuards(AccessTokenGqlAuthGuard)
  async deletePhoto(
    @CurrentUserGql('id') currentUserId: string,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.removePhotoById(currentUserId, id);
  }
}
