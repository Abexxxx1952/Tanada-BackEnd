import {
  ClassSerializerInterceptor,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Int,
  Context,
  Directive,
} from '@nestjs/graphql';
import { Response } from 'express';
import { UserEntity } from './entity/user.entity';
import { UsersRepository } from './repository/users.repository';
import { UpdateResult } from '../../database/abstractRepository/types/updateResult';
import { CurrentUserGql } from '../../common/decorators/currentUserGql.decorator';
import { AttachedUser } from './auth/types/attachedUser';
import { AuthService } from './auth/auth.service';
import { AttachedUserWithRt } from './auth/types/attachedUserWithRt';
import { UserPaginationParamsGqlArgs } from './gql/args/pagination.args';
import { UserGqlModel } from './gql/model/user';
import { FindUserByConditionsGqlInput } from './gql/inputs/findUserByConditions.input';
import { FindOneUserWithConditionsGqlInput } from './gql/inputs/findWithConditions.args';
import { CreateUserGqlArgsLocal } from './gql/args/createLocal.args';
import { AttachedUserGqlModel } from './gql/model/attachedUser';
import { UpdateUserResultGqlModel } from './gql/model/updateResult';
import { UpdateUserGqlArgs } from './gql/args/updateUser.args';
import { AccessTokenGqlAuthGuard } from './auth/guards/gqlAccessToken.guard';
import { RefreshTokenGqlAuthGuard } from './auth/guards/gqlRefreshToken.guard';
import { LoginLocalArgs } from './gql/args/loginLocal.args';
import { Tokens } from './auth/types/tokens';
import { AccessTokenFromHeadersGqlAuthGuard } from './auth/guards/gqlAccessTokenFromHeaders.guard';
import { RefreshTokenFromHeadersGqlAuthGuard } from './auth/guards/gqlRefreshTokenFromHeaders.guard';

@Resolver()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersResolver {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [UserGqlModel], { name: 'getUsers', nullable: true })
  async getUsers(
    @Args()
    { offset, limit }: UserPaginationParamsGqlArgs,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAll({
      skip: offset,
      take: limit,
    });
  }

  @Query(() => UserGqlModel, { name: 'getUserById', nullable: true })
  async getUserOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneById(id);
  }

  @Query(() => UserGqlModel, { name: 'getUserOneBy', nullable: true })
  async getUserOneBy(
    @Args('condition') condition: FindUserByConditionsGqlInput,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneByCondition(condition);
  }

  @Query(() => [UserGqlModel], { name: 'getUserManyBy', nullable: true })
  async getUserManyBy(
    @Args('condition') condition: FindUserByConditionsGqlInput,
    @Args() { offset, limit }: UserPaginationParamsGqlArgs,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAllByCondition(
      condition,
      offset,
      limit,
    );
  }

  @Query(() => UserGqlModel, { name: 'getUserOneWith', nullable: true })
  async getUserOneWith(
    @Args('condition') condition: FindOneUserWithConditionsGqlInput,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneWithCondition(condition);
  }

  @Query(() => UserGqlModel, { name: 'userStatus', nullable: true })
  @UseGuards(AccessTokenGqlAuthGuard)
  async getUserStatus(
    @CurrentUserGql() currentUser: AttachedUser,
  ): Promise<UserEntity> {
    return await this.usersRepository.status(currentUser.email);
  }

  @Query(() => UserGqlModel, { name: 'userStatusFromHeaders', nullable: true })
  @UseGuards(AccessTokenFromHeadersGqlAuthGuard)
  async getUserStatusFromHeaders(
    @CurrentUserGql() currentUser: AttachedUser,
  ): Promise<UserEntity> {
    return await this.usersRepository.status(currentUser.email);
  }

  @Mutation(() => UserGqlModel, {
    name: 'createUser',
  })
  async createUser(
    @Args() createUserLocal: CreateUserGqlArgsLocal,
  ): Promise<UserEntity> {
    return await this.usersRepository.createUserLocal(createUserLocal);
  }

  @Directive('@sensitive(fields: ["password"])')
  @Mutation(() => AttachedUserGqlModel, {
    name: 'loginLocal',
  })
  async loginLocal(
    @Args() { email, password }: LoginLocalArgs,
    @Context() context: any,
  ): Promise<AttachedUser> {
    const currentUser = await this.authService.validateUserLocal(
      email,
      password,
    );

    const response: Response = context.res;

    return await this.authService.login(currentUser, response);
  }

  @Mutation(() => AttachedUserGqlModel, {
    name: 'logOut',
  })
  @UseGuards(AccessTokenGqlAuthGuard)
  async logout(
    @CurrentUserGql() currentUser: AttachedUser,
    @Context() context: any,
  ): Promise<AttachedUser> {
    const response: Response = context.res;
    return await this.authService.logout(currentUser, response);
  }

  @Mutation(() => AttachedUserGqlModel, {
    name: 'logOutFromHeaders',
  })
  @UseGuards(AccessTokenFromHeadersGqlAuthGuard)
  async logoutFromHeaders(
    @CurrentUserGql() currentUser: AttachedUser,
    @Context() context: any,
  ): Promise<AttachedUser> {
    const response: Response = context.res;
    return await this.authService.logout(currentUser, response);
  }

  @Mutation(() => String, {
    name: 'refresh',
  })
  @UseGuards(RefreshTokenGqlAuthGuard)
  async refreshTokens(
    @CurrentUserGql() currentUserWithRt: AttachedUserWithRt,
    @Context() context: any,
  ): Promise<Tokens> {
    const response: Response = context.res;
    return await this.authService.refreshTokens(currentUserWithRt, response);
  }

  @Mutation(() => String, {
    name: 'refreshFromHeaders',
  })
  @UseGuards(RefreshTokenFromHeadersGqlAuthGuard)
  async refreshTokensFromHeaders(
    @CurrentUserGql() currentUserWithRt: AttachedUserWithRt,
    @Context() context: any,
  ): Promise<Tokens> {
    const response: Response = context.res;
    return await this.authService.refreshTokens(currentUserWithRt, response);
  }

  @Directive('@sensitive(fields: ["password"])')
  @Mutation(() => UpdateUserResultGqlModel, {
    name: 'updateUser',
  })
  @UseGuards(AccessTokenGqlAuthGuard)
  async updateUser(
    @Args() updateUser: UpdateUserGqlArgs,
    @CurrentUserGql('id') currentUserId: string,
  ): Promise<UpdateResult> {
    return await this.usersRepository.updateOneUserByIdSoft(
      currentUserId,
      updateUser,
    );
  }

  @Directive('@sensitive(fields: ["password"])')
  @Mutation(() => UpdateUserResultGqlModel, {
    name: 'updateUserFromHeaders',
  })
  @UseGuards(AccessTokenFromHeadersGqlAuthGuard)
  async updateUserFromHeaders(
    @Args() updateUser: UpdateUserGqlArgs,
    @CurrentUserGql('id') currentUserId: string,
  ): Promise<UpdateResult> {
    return await this.usersRepository.updateOneUserByIdSoft(
      currentUserId,
      updateUser,
    );
  }

  @Mutation(() => UserGqlModel, {
    name: 'deleteUser',
  })
  @UseGuards(AccessTokenGqlAuthGuard)
  async deleteUser(
    @CurrentUserGql('id') currentUserId: string,
  ): Promise<UserEntity> {
    return await this.usersRepository.removeUserById(currentUserId);
  }

  @Mutation(() => UserGqlModel, {
    name: 'deleteUserFromHeaders',
  })
  @UseGuards(AccessTokenFromHeadersGqlAuthGuard)
  async deleteUserFromHeaders(
    @CurrentUserGql('id') currentUserId: string,
  ): Promise<UserEntity> {
    return await this.usersRepository.removeUserById(currentUserId);
  }
}
