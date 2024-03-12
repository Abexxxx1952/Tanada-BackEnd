import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, UpdateResult } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { UserEntity } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { RegistrationSources } from '../auth/types/providersOAuth.enum';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<UserEntity> {
  private readonly uniqueProperty: string = 'email';
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {
    super(UserRepository, 'User');
  }
  public async createUserLocal(
    createUserLocalDto: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };
    let user: DeepPartial<UserEntity>;

    try {
      user = await this.findOneByCondition({
        [this.uniqueProperty]: createUserLocalDto.email,
      });

      if (user) {
        errorResponse.errors[this.uniqueProperty] = 'Has already been taken';
        throw new ConflictException();
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(errorResponse);
      }
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException(error);
      }
    }

    if (!user) {
      try {
        const hashedPassword: string = await this.hashPassword(
          createUserLocalDto.password,
        );

        const entity = this.create({
          ...createUserLocalDto,
          password: hashedPassword,
          registrationSources: [RegistrationSources.Local],
        });

        return await this.save(entity);
      } catch (error) {
        throw error;
      }
    }
  }

  public async createUserOAuth(
    createUserOAuthDto: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    try {
      const entity: UserEntity = this.create(createUserOAuthDto);

      return await this.save(entity);
    } catch (error) {
      throw error;
    }
  }

  public async status(email: string): Promise<UserEntity> {
    try {
      return await this.findOneByCondition({
        email,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }
      throw error;
    }
  }

  public async updateOneUserByIdSoft(
    id: string,
    data: QueryDeepPartialEntity<UserEntity>,
  ): Promise<UpdateResult> {
    if (data.password) {
      data.password = await this.hashPassword(data.password.toString());
      let existUser: UserEntity;
      try {
        existUser = await this.findOneById(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new ForbiddenException('Access Denied');
        }
        throw error;
      }

      if (!existUser.registrationSources.includes(RegistrationSources.Local)) {
        data.registrationSources = [
          ...existUser.registrationSources,
          RegistrationSources.Local,
        ];
      }
    }
    try {
      return await this.UserRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  public async removeUserById(id: string): Promise<UserEntity> {
    try {
      return await this.removeById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }
}
