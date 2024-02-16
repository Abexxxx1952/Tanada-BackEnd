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
import { UsersRepository } from './repository/users.repository';
import { UserEntity } from './entity/user.entity';
import { FindByConditionsDto } from './dto/findByConditions.dto';
import {
  FindOneWithConditionsDto,
  FindAllWithConditionsDto,
} from './dto/findWithConditions.dto';
import { CreateUserDtoLocal } from './dto/createLocal.dto';
import { LoginUserDtoLocal } from './dto/loginUserLocal.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('users')
@Controller('v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<UserEntity> {
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
    @Body() condition: FindByConditionsDto,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAllByCondition(condition);
  }

  @Post('findOneWith')
  async findOneWithCondition(
    @Body() condition: FindOneWithConditionsDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneWithCondition(condition);
  }

  @Post('findAllWith')
  async findAllWithCondition(
    @Body() condition: FindAllWithConditionsDto,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAllWithCondition(condition);
  }

  @Post('registration')
  async create(@Body() createUserDto: CreateUserDtoLocal): Promise<UserEntity> {
    return await this.usersRepository.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDtoLocal): Promise<UserEntity> {
    return await this.usersRepository.createUser(loginUserDto);
  }

  @Patch()
  async updateUser(
    @CurrentUser('id') currentUserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersRepository.updateOneByIdSoft(
      currentUserId,
      updateUserDto,
    );
  }

  @Delete()
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
