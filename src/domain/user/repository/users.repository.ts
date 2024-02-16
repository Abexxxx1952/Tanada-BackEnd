import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<UserEntity> {
  private readonly uniqueProperty: string = 'email';
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {
    super(UserRepository, 'User');
  }
  public async createUser(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };
    let user: DeepPartial<UserEntity>;
    try {
      user = await this.findOneByCondition({
        [this.uniqueProperty]: data.email,
      });
      if (user) {
        errorResponse.errors[this.uniqueProperty] = 'Has already been taken';
      }
      if (user) {
        throw new ConflictException();
      }
    } catch (error) {
      if (error instanceof NotFoundException) return;

      if (error instanceof ConflictException) {
        throw new ConflictException(errorResponse);
      }
      throw new InternalServerErrorException(error);
    }
    if (!user) {
      const entity = this.create(data);
      if (!entity) {
        throw new BadRequestException(`Failed to create ${this.entityName}`);
      }
      return await this.save(entity);
    }
  }
}
