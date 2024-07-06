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
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Response } from 'express';

import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { ParseRequestBodyWhenLogging } from '../../common/decorators/setMetadataRequestBodyLogging.decorator';
import { LoggerHelperInterceptor } from '../../common/interceptors/loggerHelper.interceptor';
import { UsersRepository } from './repository/users.repository';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './entity/user.entity';
import { FindUserByConditionsDto } from './dto/findByConditions.dto';
import {
  FindOneUserWithConditionsDto,
  FindAllUserWithConditionsDto,
} from './dto/findWithConditions.dto';
import {
  CreateUserLocalDto,
  CreateUserDtoLocalWithoutPassword,
} from './dto/createLocal.dto';
import { LoginLocalUserDtoWithoutPassword } from './dto/loginUserLocal.dto';
import { UpdateUserDto } from './dto/update.dto';
import { PaginationParams } from '../../database/abstractRepository/paginationDto/pagination.dto';
import { LocalAuthGuard } from './auth/guards/localAuth.guard';
import { RefreshTokenAuthGuard } from './auth/guards/refreshToken.guard';
import { AttachedUserWithRt } from './auth/types/attachedUserWithRt';
import { AttachedUser } from './auth/types/attachedUser';
import { AccessTokenAuthGuard } from './auth/guards/accessToken.guard';
import { GoogleGuard } from './auth/guards/google.guard';
import { GitHubGuard } from './auth/guards/gitHub.guard';
import {
  ApiUsersGet,
  ApiUsersGetFindById,
  ApiUsersPostFindOneBy,
  ApiUsersPostFindManyBy,
  ApiUsersPostFindOneWith,
  ApiUsersPostFindAllWith,
  ApiUsersPostRegistration,
  ApiUsersPostLoginLocal,
  ApiUsersPostLogOut,
  ApiUsersPostRefresh,
  ApiUsersGetLoginGoogle,
  ApiUsersGetLoginGoogleCallback,
  ApiUsersGetLoginGitHub,
  ApiUsersGetLoginGitHubCallback,
  ApiUsersGetStatus,
  ApiUsersPatchUpdate,
  ApiUsersDeleteDelete,
} from 'src/swagger/user';
import { UUID } from 'crypto';
import {
  UseInterceptorsCacheInterceptor,
  CacheOptions,
} from 'src/common/interceptors/cache.interceptor';

@ApiTags('v1/users')
@Controller('v1/users')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggerHelperInterceptor)
export class UserController {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiUsersGet()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAll(offset, limit);
  }

  @Get('findById/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiUsersGetFindById()
  async findOneById(@Param('id', ParseUUIDPipe) id: UUID): Promise<UserEntity> {
    return await this.usersRepository.findOneById(id);
  }

  @Post('findOneBy')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiUsersPostFindOneBy()
  async findOneByCondition(
    @Body() condition: FindUserByConditionsDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneByCondition(condition);
  }

  @Post('findManyBy')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiUsersPostFindManyBy()
  async findManyByCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindUserByConditionsDto,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAllByCondition(
      condition,
      offset,
      limit,
    );
  }

  @Post('findOneWith')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiUsersPostFindOneWith()
  async findOneWithCondition(
    @Body() condition: FindOneUserWithConditionsDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneWithCondition(condition);
  }

  @Post('findAllWith')
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor()
  @ApiUsersPostFindAllWith()
  async findAllWithCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindAllUserWithConditionsDto,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAllWithCondition(
      condition,
      offset,
      limit,
    );
  }

  @Get('status')
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiUsersGetStatus()
  async status(@CurrentUser() currentUser: AttachedUser): Promise<UserEntity> {
    return await this.usersRepository.status(currentUser.email);
  }

  @Post('registration')
  @ParseRequestBodyWhenLogging(CreateUserDtoLocalWithoutPassword)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptorsCacheInterceptor({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/', '/api/v1/stats/users'],
  })
  @ApiUsersPostRegistration()
  async create(
    @Body() createUserLocalDto: CreateUserLocalDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.createUserLocal(createUserLocalDto);
  }

  @Post('loginLocal')
  @UseGuards(LocalAuthGuard)
  @ParseRequestBodyWhenLogging(LoginLocalUserDtoWithoutPassword)
  @HttpCode(HttpStatus.OK)
  @ApiUsersPostLoginLocal()
  async loginLocal(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AttachedUser> {
    return await this.authService.login(currentUser, response);
  }

  @Post('logOut')
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiUsersPostLogOut()
  async logout(
    @CurrentUser() currentUser: AttachedUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AttachedUser> {
    return await this.authService.logout(currentUser, response);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiUsersPostRefresh()
  async refreshTokens(
    @CurrentUser() currentUserWithRt: AttachedUserWithRt,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    return await this.authService.refreshTokens(currentUserWithRt, response);
  }

  @Get('loginGoogle')
  @UseGuards(GoogleGuard)
  @ApiUsersGetLoginGoogle()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('loginGoogle/callback')
  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/', '/api/v1/stats/users'],
  })
  @ApiUsersGetLoginGoogleCallback()
  async googleAuthCallBack(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AttachedUser> {
    return await this.authService.login(currentUser, response);
  }

  @Get('loginGitHub')
  @UseGuards(GitHubGuard)
  @ApiUsersGetLoginGitHub()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  gitHubAuth() {}

  @Get('loginGitHub/callback')
  @UseGuards(GitHubGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/', '/api/v1/stats/users'],
  })
  @ApiUsersGetLoginGitHubCallback()
  async gitHubAuthCallBack(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AttachedUser> {
    return await this.authService.login(currentUser, response);
  }

  @Patch('update')
  @ParseRequestBodyWhenLogging(CreateUserDtoLocalWithoutPassword)
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/'],
  })
  @ApiUsersPatchUpdate()
  async updateUser(
    @CurrentUser('id') currentUserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersRepository.updateOneUserByIdSoft(
      currentUserId,
      updateUserDto,
    );
  }

  @Delete('delete')
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptorsCacheInterceptor({ cache: CacheOptions.InvalidateAllCache })
  @ApiUsersDeleteDelete()
  async deleteUser(
    @CurrentUser('id') currentUserId: string,
  ): Promise<UserEntity> {
    return await this.usersRepository.removeUserById(currentUserId);
  }
}
