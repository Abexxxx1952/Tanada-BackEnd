import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { PhotosRepository } from './repository/photos.repository';
import { PhotoEntity } from './entity/photo.entity';
import { FindByConditionsDto } from './dto/findByConditions.dto';
import {
  FindOneWithConditionsDto,
  FindAllWithConditionsDto,
} from './dto/findWithConditions.dto';
import { CreatePhotoDto } from './dto/create.dto';
import { UpdatePhotoDto } from './dto/update.dto';
import { InsertResult, UpdateResult } from 'typeorm';
import { PaginationParams } from '../../database/abstractRepository/paginationDto/pagination.dto';

@ApiTags('photos')
@Controller('v1/photos')
export class PhotoController {
  constructor(
    @Inject('PhotosRepository')
    private readonly photosRepository: PhotosRepository,
  ) {}

  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAll(offset, limit);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<PhotoEntity> {
    return await this.photosRepository.findOneById(id);
  }

  @Post('findOneBy')
  async findOneByCondition(
    @Body() condition: FindByConditionsDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneByCondition(condition);
  }

  @Post('findManyBy')
  async findManyByCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindByConditionsDto,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAllByCondition(
      condition,
      offset,
      limit,
    );
  }

  @Post('findOneWith')
  async findOneWithCondition(
    @Body() condition: FindOneWithConditionsDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneWithCondition(condition);
  }

  @Post('findAllWith')
  async findAllWithCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindAllWithConditionsDto,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAllWithCondition(
      condition,
      offset,
      limit,
    );
  }

  @Post()
  async create(
    @CurrentUser('id') currentUserId: string,
    @Body() createPhotoDto: CreatePhotoDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.createPhoto(
      currentUserId,
      createPhotoDto,
    );
  }

  @Put()
  async updateUserHard(
    @CurrentUser('id') currentUserId: string,
    @Body('photo') updatePhotoDto: UpdatePhotoDto,
  ): Promise<InsertResult> {
    return await this.photosRepository.updateOneByIdHard(
      currentUserId,
      updatePhotoDto,
    );
  }

  @Patch()
  async updateUserSoft(
    @CurrentUser('id') currentUserId: string,
    @Body('photo') updatePhotoDto: UpdatePhotoDto,
  ): Promise<UpdateResult> {
    return await this.photosRepository.updateOneByIdSoft(
      currentUserId,
      updatePhotoDto,
    );
  }

  @Delete()
  async deleteUser(
    @CurrentUser('id') currentUserId: string,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.removeById(currentUserId);
  }
}
