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
import { UUID } from 'crypto';
import { CurrentUser } from '../../common/decorators/currentUser.decorator';
import { ParseRequestBodyWhenLogging } from '../../common/decorators/setMetadataRequestBodyLogging.decorator';
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
  CacheOptions,
  CacheInterceptor,
  CacheOptionInvalidateCache,
} from '../../common/interceptors/cache.interceptor';
import { AccessTokenFromHeadersAuthGuard } from './auth/guards/accessTokenFromHeaders.guard';
import { Tokens } from './auth/types/tokens';
import { RefreshTokenFromHeadersAuthGuard } from './auth/guards/refreshTokenFromHeaders.guard';
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
  ApiUsersGetStatusFromHeaders,
  ApiUsersPostLogOutFromHeaders,
  ApiUsersPostRefreshFromHeaders,
  ApiUsersPatchUpdateFromHeaders,
  ApiUsersDeleteDeleteFromHeaders,
} from '../../swagger/user';

@ApiTags('v1/users')
@Controller('v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @ApiUsersGet()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAll({
      skip: offset,
      take: limit,
    });
  }

  @Get('findById/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @ApiUsersGetFindById()
  async findOneById(@Param('id', ParseUUIDPipe) id: UUID): Promise<UserEntity> {
    return await this.usersRepository.findOneById(id);
  }

  @Get('findOneBy')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @ApiUsersPostFindOneBy()
  async findOneByCondition(
    @Query() condition: { condition: string },
  ): Promise<UserEntity> {
    let parsedCondition: FindUserByConditionsDto;
    try {
      parsedCondition =
        await this.usersRepository.parsedCondition<FindUserByConditionsDto>(
          condition,
          FindUserByConditionsDto,
        );
    } catch (error) {
      throw error;
    }

    return await this.usersRepository.findOneByCondition(parsedCondition);
  }

  @Get('findManyBy')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @ApiUsersPostFindManyBy()
  async findManyByCondition(
    @Query() { offset, limit }: PaginationParams,
    @Query() condition: { condition: string },
  ): Promise<UserEntity[]> {
    let parsedCondition: FindUserByConditionsDto;
    try {
      parsedCondition =
        await this.usersRepository.parsedCondition<FindUserByConditionsDto>(
          condition,
          FindUserByConditionsDto,
        );
    } catch (error) {
      throw error;
    }

    return await this.usersRepository.findAllByCondition(
      parsedCondition,
      offset,
      limit,
    );
  }

  @Get('findOneWith')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @ApiUsersPostFindOneWith()
  async findOneWithCondition(
    @Query() condition: { condition: string },
  ): Promise<UserEntity> {
    let parsedCondition: FindOneUserWithConditionsDto;
    try {
      parsedCondition =
        await this.usersRepository.parsedCondition<FindOneUserWithConditionsDto>(
          condition,
          FindOneUserWithConditionsDto,
        );
    } catch (error) {
      throw error;
    }

    return await this.usersRepository.findOneWithCondition(parsedCondition);
  }

  @Get('findAllWith')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @ApiUsersPostFindAllWith()
  async findAllWithCondition(
    @Query() { offset = 0, limit = 10000 }: PaginationParams,
    @Query() condition: { condition: string },
  ): Promise<UserEntity[]> {
    let parsedCondition: FindAllUserWithConditionsDto;
    try {
      parsedCondition =
        await this.usersRepository.parsedCondition<FindAllUserWithConditionsDto>(
          condition,
          FindAllUserWithConditionsDto,
        );
    } catch (error) {
      throw error;
    }

    return await this.usersRepository.findAllWithCondition({
      ...parsedCondition,
      skip: offset,
      take: limit,
    });
  }

  @Get('status')
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiUsersGetStatus()
  async status(@CurrentUser() currentUser: AttachedUser): Promise<UserEntity> {
    return await this.usersRepository.status(currentUser.email);
  }

  @Get('statusFromHeaders')
  @UseGuards(AccessTokenFromHeadersAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiUsersGetStatusFromHeaders()
  async setCookiesFromHeaders(
    @CurrentUser() currentUser: AttachedUser,
  ): Promise<UserEntity> {
    return await this.usersRepository.status(currentUser.email);
  }

  @Post('registration')
  @ParseRequestBodyWhenLogging(CreateUserDtoLocalWithoutPassword)
  @HttpCode(HttpStatus.CREATED)
  @CacheOptionInvalidateCache({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/', '/api/v1/stats/usersStats'],
  })
  @UseInterceptors(CacheInterceptor)
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
  ): Promise<UserEntity> {
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

  @Post('logOutFromHeaders')
  @UseGuards(AccessTokenFromHeadersAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiUsersPostLogOutFromHeaders()
  async logoutFromHeaders(
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
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(currentUserWithRt, response);
  }

  @Post('refreshFromHeaders')
  @UseGuards(RefreshTokenFromHeadersAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiUsersPostRefreshFromHeaders()
  async refreshTokensFromHeaders(
    @CurrentUser() currentUserWithRt: AttachedUserWithRt,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(currentUserWithRt, response);
  }

  @Get('loginGoogle')
  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.FOUND)
  @ApiUsersGetLoginGoogle()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('loginGoogle/callback')
  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @CacheOptionInvalidateCache({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/', '/api/v1/stats/usersStats'],
  })
  @UseInterceptors(CacheInterceptor)
  @ApiUsersGetLoginGoogleCallback()
  async googleAuthCallBack(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.loginWithProvider(currentUser, response);
  }

  @Get('loginGitHub')
  @UseGuards(GitHubGuard)
  @HttpCode(HttpStatus.FOUND)
  @ApiUsersGetLoginGitHub()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  gitHubAuth() {}

  @Get('loginGitHub/callback')
  @UseGuards(GitHubGuard)
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @CacheOptionInvalidateCache({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/', '/api/v1/stats/usersStats'],
  })
  @UseInterceptors(CacheInterceptor)
  @ApiUsersGetLoginGitHubCallback()
  async gitHubAuthCallBack(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.loginWithProvider(currentUser, response);
  }

  @Patch('update')
  @ParseRequestBodyWhenLogging(CreateUserDtoLocalWithoutPassword)
  @UseGuards(AccessTokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @CacheOptionInvalidateCache({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/'],
  })
  @UseInterceptors(CacheInterceptor)
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

  @Patch('updateFromHeaders')
  @ParseRequestBodyWhenLogging(CreateUserDtoLocalWithoutPassword)
  @UseGuards(AccessTokenFromHeadersAuthGuard)
  @HttpCode(HttpStatus.OK)
  @CacheOptionInvalidateCache({
    cache: CacheOptions.InvalidateCacheByKey,
    cacheKey: ['/api/v1/users/'],
  })
  @UseInterceptors(CacheInterceptor)
  @ApiUsersPatchUpdateFromHeaders()
  async updateUserFromHeaders(
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
  @CacheOptionInvalidateCache({ cache: CacheOptions.InvalidateAllCache })
  @UseInterceptors(CacheInterceptor)
  @ApiUsersDeleteDelete()
  async deleteUser(
    @CurrentUser('id') currentUserId: string,
  ): Promise<UserEntity> {
    return await this.usersRepository.removeUserById(currentUserId);
  }

  @Delete('deleteFromHeaders')
  @UseGuards(AccessTokenFromHeadersAuthGuard)
  @HttpCode(HttpStatus.OK)
  @CacheOptionInvalidateCache({ cache: CacheOptions.InvalidateAllCache })
  @UseInterceptors(CacheInterceptor)
  @ApiUsersDeleteDeleteFromHeaders()
  async deleteUserFromHeaders(
    @CurrentUser('id') currentUserId: string,
  ): Promise<UserEntity> {
    return await this.usersRepository.removeUserById(currentUserId);
  }
}
