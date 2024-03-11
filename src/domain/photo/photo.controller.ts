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
import { UpdateResult } from 'typeorm';
import { PaginationParams } from '../../database/abstractRepository/paginationDto/pagination.dto';
import { AccessTokenAuthGuard } from '../user/auth/guards/accessToken.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
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
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<PhotoEntity[]> {
    return await this.photosRepository.findAll(offset, limit);
  }

  @Get('findById/:id')
  @HttpCode(HttpStatus.OK)
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneById(id);
  }

  @Post('findOneBy')
  @HttpCode(HttpStatus.OK)
  async findOneByCondition(
    @Body() condition: FindByConditionsDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneByCondition(condition);
  }

  @Post('findManyBy')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async findOneWithCondition(
    @Body() condition: FindOneWithConditionsDto,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.findOneWithCondition(condition);
  }

  @Post('findAllWith')
  @HttpCode(HttpStatus.OK)
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

  @Post('create')
  @UseGuards(PermissionGuard([PhotosPermission.CreatePhoto]))
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.CREATED)
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
  async updatePhotoHard(
    @CurrentUser('id') currentUserId: string,
    @Body('photo') updatePhotoDto: UpdatePhotoDto,
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
  async updatePhotoSoft(
    @CurrentUser('id') currentUserId: string,
    @Body('photo') updatePhotoDto: UpdatePhotoDto,
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
  async deletePhoto(
    @CurrentUser('id') currentUserId: string,
    @Param('id') id: number,
  ): Promise<PhotoEntity> {
    return await this.photosRepository.removePhotoById(currentUserId, id);
  }
}
