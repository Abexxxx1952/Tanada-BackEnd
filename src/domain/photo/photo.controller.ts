import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import {
  ApiPhotosGet,
  ApiPhotosGetFindById,
  ApiPhotosPostFindOneBy,
  ApiPhotosPostFindManyBy,
  ApiPhotosPostFindOneWith,
  ApiPhotosPostFindAllWith,
  ApiPhotosPostCreate,
  ApiPhotosPutUpdatePhotoHard,
  ApiPhotosPatchUpdatePhotoSoft,
  ApiPhotosDeletePhoto,
} from '../../swagger/photo/index';
import { PhotosRepository } from './repository/photos.repository';
import { AccessTokenAuthGuard } from '../user/auth/guards/accessToken.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { PhotoEntity } from './entity/photo.entity';
import { FindPhotoByConditionsDto } from './dto/findByConditions.dto';
import {
  FindOnePhotoWithConditionsDto,
  FindAllPhotoWithConditionsDto,
} from './dto/findWithConditions.dto';
import { CreatePhotoDto } from './dto/create.dto';
import { UpdatePhotoDto } from './dto/update.dto';
import { PaginationParams } from '../../database/abstractRepository/paginationDto/pagination.dto';
import { PhotosPermission } from './permission/photos.permission.enum';

@ApiTags('v1/photos')
@Controller('v1/photos')
export class PhotoController {
  constructor(
    @Inject('PhotosRepository')
    private readonly photosRepository: PhotosRepository,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPhotosGet()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAll(offset, limit);
  }

  @Get('findById/:id')
  @HttpCode(HttpStatus.OK)
  @ApiPhotosGetFindById()
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneById(id);
  }

  @Post('findOneBy')
  @HttpCode(HttpStatus.OK)
  @ApiPhotosPostFindOneBy()
  async findOneByCondition(
    @Body() condition: FindPhotoByConditionsDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneByCondition(condition);
  }

  @Post('findManyBy')
  @HttpCode(HttpStatus.OK)
  @ApiPhotosPostFindManyBy()
  async findManyByCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindPhotoByConditionsDto,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAllByCondition(
      condition,
      offset,
      limit,
    );
  }

  @Post('findOneWith')
  @HttpCode(HttpStatus.OK)
  @ApiPhotosPostFindOneWith()
  async findOneWithCondition(
    @Body() condition: FindOnePhotoWithConditionsDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneWithCondition(condition);
  }

  @Post('findAllWith')
  @HttpCode(HttpStatus.OK)
  @ApiPhotosPostFindAllWith()
  async findAllWithCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindAllPhotoWithConditionsDto,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAllWithCondition(
      condition,
      offset,
      limit,
    );
  }

  @Post('create')
  @UseGuards(PermissionGuard([PhotosPermission.CreatePhoto]))
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiPhotosPostCreate()
  async createPhoto(
    @CurrentUser('id') currentUserId: string,
    @Body() createPhotoDto: CreatePhotoDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.createPhoto(
      currentUserId,
      createPhotoDto,
    );
  }

  @Put('updatePhotoHard')
  @UseGuards(PermissionGuard([PhotosPermission.UpdatePhoto]))
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiPhotosPutUpdatePhotoHard()
  async updatePhotoHard(
    @CurrentUser('id') currentUserId: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.updateOnePhotoByIdHard(
      currentUserId,
      updatePhotoDto,
    );
  }

  @Patch('updatePhotoSoft')
  @UseGuards(PermissionGuard([PhotosPermission.UpdatePhoto]))
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiPhotosPatchUpdatePhotoSoft()
  async updatePhotoSoft(
    @CurrentUser('id') currentUserId: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<UpdateResult> {
    return await this.photosRepository.updateOnePhotoByIdSoft(
      currentUserId,
      updatePhotoDto,
    );
  }

  @Delete('deletePhoto/:id')
  @UseGuards(PermissionGuard([PhotosPermission.DeletePhoto]))
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiPhotosDeletePhoto()
  async deletePhoto(
    @CurrentUser('id') currentUserId: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.removePhotoById(currentUserId, id);
  }
}
