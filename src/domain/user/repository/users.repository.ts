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
import * as bcrypt from 'bcrypt';

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
    createUserDto: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };
    let user:
      | DeepPartial<UserEntity>
      | NotFoundException
      | InternalServerErrorException;
    try {
      user = await this.findOneByCondition({
        [this.uniqueProperty]: createUserDto.email,
      });

      if (user) {
        errorResponse.errors[this.uniqueProperty] = 'Has already been taken';
      }
      if (user) {
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
      const hashedPassword: string = await this.hashPassword(
        createUserDto.password,
      );

      const entity = this.create({
        ...createUserDto,
        password: hashedPassword,
      });
      if (!entity) {
        throw new BadRequestException(`Failed to create ${this.entityName}`);
      }
      return await this.save(entity);
    }
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }
}
