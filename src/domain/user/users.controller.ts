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
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Response } from 'express';

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
import { ParseRequestBodyWhenLogging } from '../../common/decorators/setMetadataRequestBodyLogging.decorator';
import { LoggerHelperInterceptor } from '../../common/interceptors/loggerHelper.interceptor';
import { UsersRepository } from './repository/users.repository';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './entity/user.entity';
import { FindByConditionsDto } from './dto/findByConditions.dto';
import {
  FindOneWithConditionsDto,
  FindAllWithConditionsDto,
} from './dto/findWithConditions.dto';
import {
  CreateUserDtoLocal,
  CreateUserDtoLocalWithoutPassword,
} from './dto/createLocal.dto';
import { LoginLocalUserDtoWithoutPassword } from './dto/loginUserLocal.dto';
import { UpdateUserDto } from './dto/update.dto';
import { PaginationParams } from '../../database/abstractRepository/paginationDto/pagination.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { RefreshTokenAuthGuard } from './auth/guards/refreshToken.guard';
import { AttachedUserWithRt } from './auth/types/attachedUserWithRt';
import { AttachedUser } from './auth/types/attachedUser';
import { AccessTokenAuthGuard } from './auth/guards/accessToken.guard';

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
  async findAll(
    @Query() { offset, limit }: PaginationParams,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAll(offset, limit);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<any> {
    return await this.usersRepository.findOneById(id);
  }

  @Post('findOneBy')
  async findOneByCondition(
    @Body() condition: FindByConditionsDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneByCondition(condition);
  }

  @Post('findManyBy')
  async findManyByCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindByConditionsDto,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAllByCondition(
      condition,
      offset,
      limit,
    );
  }

  @Post('findOneWith')
  async findOneWithCondition(
    @Body() condition: FindOneWithConditionsDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneWithCondition(condition);
  }

  @Post('findAllWith')
  async findAllWithCondition(
    @Query() { offset, limit }: PaginationParams,
    @Body() condition: FindAllWithConditionsDto,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAllWithCondition(
      condition,
      offset,
      limit,
    );
  }

  @Post('registration')
  @ParseRequestBodyWhenLogging(CreateUserDtoLocalWithoutPassword)
  async create(@Body() createUserDto: CreateUserDtoLocal): Promise<UserEntity> {
    return await this.usersRepository.createUserLocal(createUserDto);
  }

  @Post('loginLocal')
  @UseGuards(LocalAuthGuard)
  @ParseRequestBodyWhenLogging(LoginLocalUserDtoWithoutPassword)
  async loginLocal(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AttachedUser> {
    return await this.authService.loginLocal(currentUser, response);
  }

  @Post('logOut')
  @UseGuards(AccessTokenAuthGuard)
  async logout(
    @CurrentUser() currentUser: AttachedUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AttachedUser> {
    console.log(currentUser);
    return this.authService.logout(currentUser, response);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenAuthGuard)
  async refreshTokens(
    @CurrentUser() currentUserWithRt: AttachedUserWithRt,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    return this.authService.refreshTokens(currentUserWithRt, response);
  }

  @Patch('update')
  @UseGuards(AccessTokenAuthGuard)
  async updateUser(
    @CurrentUser('id') currentUserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersRepository.updateOneByIdSoft(
      currentUserId,
      updateUserDto,
    );
  }

  @Delete('delete')
  @UseGuards(AccessTokenAuthGuard)
  async deleteUser(
    @CurrentUser('id') currentUserId: string,
  ): Promise<UserEntity> {
    return await this.usersRepository.removeById(currentUserId);
  }

  /*  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return updated user credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Put(':id')
  @UseGuards(AuthUserGuard)
  async update(
    @Req() req: AuthUserRequest,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.findOne('id', userId, {
      me: req.user,
      notFoundException: true,
    });

    return this.usersService.update(userId, updateUserDto, req.user);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Delete(':id')
  @UseGuards(AuthUserGuard)
  async delete(@Req() req: AuthUserRequest, @Param('id') userId: string) {
    await this.usersService.findOne('id', userId, {
      me: req.user,
      notFoundException: true,
    });

    return this.usersService.delete(userId, req.user);
  }

  @ApiOperation({ summary: 'Subscibe/unsubscribe user' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Subscibed/unsubscribed' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Post(':id/subscribe')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthUserGuard)
  async subscribe(@Req() req: AuthUserRequest, @Param('id') userId: string) {
    await this.usersService.findOne('id', userId, {
      me: req.user,
      notFoundException: true,
    });

    return this.usersService.subscribe(userId, req.user);
  }

  @ApiOperation({ summary: 'Find user by username' })
  @ApiOkResponse({ description: 'Return user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @Get('username/:username')
  @UseGuards(AuthVisitorGuard)
  async findOneById(
    @Req() req: AuthVisitorRequest,
    @Param('username') username: string,
  ) {
    return this.usersService.findOne('username', username, {
      me: req.user,
      notFoundException: true,
    });
  }

  @ApiOperation({ summary: 'Find user subscriptions' })
  @ApiOkResponse({ description: 'Return subscribtions' })
  @ApiNotFoundResponse({ description: 'User not found' })
  // swagger
  @UseGuards(AuthVisitorGuard)
  @Get('username/:username/subscriptions')
  async subscriptions(
    @Req() req: AuthVisitorRequest,
    @Param('username') username: string,
  ) {
    const user = await this.usersService.findOne('username', username, {
      notFoundException: true,
    });

    return this.usersService.subscriptions(user.id, req.user);
  } */
}
