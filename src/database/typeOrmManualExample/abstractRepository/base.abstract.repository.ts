import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';

import { BaseInterfaceRepository } from './base.interface.repository';
import { instanceToPlain } from 'class-transformer';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface HasId {
  id: string;
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: EntityTarget<T>;
  private entityName: string;
  private connection: DataSource;
  private entityRepository: Repository<T>;
  protected constructor(entity: T, entityName: string, connection: DataSource) {
    this.entity = {
      type: entity,
      name: entityName,
    };
    this.entityName = entityName;
    this.connection = connection;
    this.entityRepository = connection.getRepository(this.entity);
  }
  public create(data: DeepPartial<T>): T {
    const user = this.entityRepository.create(data);
    if (!user) {
      throw new BadRequestException(`Failed to create ${this.entityName}`);
    }
    return user;
  }
  public createMany(data: DeepPartial<T>[]): T[] {
    const users = this.entityRepository.create(data);
    if (!users.length) {
      throw new BadRequestException(`Failed to create ${this.entityName}s`);
    }
    return users;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    try {
      const user = await this.entityRepository.save(data);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    try {
      const users = await this.entityRepository.save(data);
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    try {
      const user = await this.entityRepository.findOneBy(options);

      if (!user) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findOneByCondition(condition: FindOptionsWhere<T>): Promise<T> {
    try {
      const user = await this.entityRepository.findOneBy(condition);

      if (!user) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findAllByCondition(options: FindOptionsWhere<T>): Promise<T[]> {
    try {
      const user = await this.entityRepository.findBy(options);

      if (!user.length) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findOneWithCondition(
    filterCondition: FindOneOptions<T>,
  ): Promise<T> {
    try {
      const user = await this.entityRepository.findOne(filterCondition);
      if (!user) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findAllWithCondition(
    filterCondition: FindManyOptions<T>,
  ): Promise<T[]> {
    try {
      const users = await this.entityRepository.find(filterCondition);
      if (!users.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }
      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    try {
      const users = await this.entityRepository.find(options);
      if (!users.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }
      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async updateOneById(
    id: any,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };

    try {
      const user = await this.entityRepository.findOneBy(options);

      if (!user) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      const updateResult: UpdateResult = await this.entityRepository.update(
        id,
        data,
      );
      return updateResult;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof QueryFailedError) {
        throw new ConflictException(
          `${this.entityName} property already exists`,
        );
      }

      throw new InternalServerErrorException(error);
    }
  }

  public async removeAllByCondition(
    options: FindOptionsWhere<T>,
  ): Promise<T[]> {
    try {
      const entityToRemove = await this.findAllByCondition(options);
      if (!entityToRemove.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }

      return await this.entityRepository.remove(entityToRemove);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }

  public async removeById(id: any): Promise<T> {
    try {
      const entityToRemove = await this.findOneById(id);

      if (!entityToRemove) {
        throw new NotFoundException(`${this.entityName} not found`);
      }

      return await this.entityRepository.remove(entityToRemove);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    try {
      return await this.entityRepository.preload(entityLike);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public serialize(entity: T): Record<string, any> {
    return instanceToPlain(entity);
  }
}
