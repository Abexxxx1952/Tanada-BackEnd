import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Int,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { UserEntity } from './entity/user.entity';
import { UsersRepository } from './repository/users.repository';
import { PaginationParams } from '../../database/abstractRepository/paginationDto/pagination.dto';
import { FindUserByConditionsDto } from './dto/findByConditions.dto';
import { FindOneUserWithConditionsDto } from './dto/findWithConditions.dto';
import { UpdateResult } from '../../database/abstractRepository/types/updateResult';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { UpdateUserDto } from './dto/update.dto';
import { AttachedUser } from './auth/types/attachedUser';
import { CreateUserLocalDto } from './dto/createLocal.dto';
import { AuthService } from './auth/auth.service';
import { AttachedUserWithRt } from './auth/types/attachedUserWithRt';
import { UserPaginationParamsGqlArgs } from './gql/args/pagination.args';
import { UserGqlModel } from './gql/model/user';
import { FindUserByConditionsGqlArgs } from './gql/args/findByConditions.args';
import { FindOneUserWithConditionsGqlArgs } from './gql/args/findWithConditions.args';
import { CreateUserGqlArgsLocal } from './gql/args/createLocal.args';
import { AttachedUserGqlModel } from './gql/model/attachedUser';
import { UpdateUserResultGqlModel } from './gql/model/updateResult';
import { UpdateUserGqlArgs } from './gql/args/updateUser.args';

@Resolver(() => UserGqlModel)
export class UsersResolver {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [UserGqlModel], { name: 'getUsers', nullable: true })
  async getUsers(
    @Args() { offset, limit }: UserPaginationParamsGqlArgs,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.findAll(offset, limit);
  }

  @Query(() => UserGqlModel, { name: 'getUserById', nullable: true })
  async getUserOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneById(id);
  }

  @Query(() => UserGqlModel, { name: 'getUserOneBy', nullable: true })
  async getUserOneBy(
    @Args() condition: FindUserByConditionsGqlArgs,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneByCondition(condition);
  }

  @Query(() => [UserGqlModel], { name: 'getUserManyBy', nullable: true })
  async getUserManyBy(
    @Args() condition: FindUserByConditionsGqlArgs,
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
    @Args() condition: FindOneUserWithConditionsGqlArgs,
  ): Promise<UserEntity> {
    return await this.usersRepository.findOneWithCondition(condition);
  }

  @Query(() => UserGqlModel, { name: 'getUserStatus', nullable: true })
  async getUserStatus(
    @CurrentUser() currentUser: AttachedUser,
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

  @Mutation(() => AttachedUserGqlModel, {
    name: 'loginLocal',
  })
  async loginLocal(
    @CurrentUser() currentUser: UserEntity,
    @Context() context: GqlExecutionContext,
  ): Promise<AttachedUser> {
    const ctx = GqlExecutionContext.create(context);
    const response = ctx.getContext().res;
    return await this.authService.login(currentUser, response);
  }

  @Mutation(() => AttachedUserGqlModel, {
    name: 'logOut',
  })
  async logout(
    @CurrentUser() currentUser: AttachedUser,
    @Context() context: GqlExecutionContext,
  ): Promise<AttachedUser> {
    const ctx = GqlExecutionContext.create(context);
    const response = ctx.getContext().res;
    return await this.authService.logout(currentUser, response);
  }

  @Mutation(() => String, {
    name: 'refresh',
  })
  async refreshTokens(
    @CurrentUser() currentUserWithRt: AttachedUserWithRt,
    @Context() context: GqlExecutionContext,
  ): Promise<string> {
    const ctx = GqlExecutionContext.create(context);
    const response = ctx.getContext().res;
    return await this.authService.refreshTokens(currentUserWithRt, response);
  }

  @Mutation(() => UpdateUserResultGqlModel, {
    name: 'updateUser',
  })
  async updateUser(
    @CurrentUser('id') currentUserId: string,
    @Args() updateUser: UpdateUserGqlArgs,
  ): Promise<UpdateResult> {
    return await this.usersRepository.updateOneUserByIdSoft(
      currentUserId,
      updateUser,
    );
  }

  @Mutation(() => UserGqlModel, {
    name: 'deleteUser',
  })
  async deleteUser(
    @CurrentUser('id') currentUserId: string,
  ): Promise<UserGqlModel> {
    return await this.usersRepository.removeUserById(currentUserId);
  }
}
