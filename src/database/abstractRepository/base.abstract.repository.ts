import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  InsertResult,
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
  id: string | number;
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  public entity: Repository<T>;
  public entityName: string;
  protected constructor(entity: Repository<T>, entityName: string) {
    this.entity = entity;
    this.entityName = entityName;
  }
  public create(data: DeepPartial<T>): T {
    const entity = this.entity.create(data);
    if (!entity) {
      throw new BadRequestException(`Failed to create ${this.entityName}`);
    }
    return entity;
  }
  public createMany(data: DeepPartial<T>[]): T[] {
    const entities = this.entity.create(data);
    if (!entities.length) {
      throw new BadRequestException(`Failed to create ${this.entityName}s`);
    }
    return entities;
  }

  public async save(data: T): Promise<T> {
    try {
      const entity = await this.entity.save(data);
      return entity;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    try {
      const entities = await this.entity.save(data);
      return entities;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    try {
      const entity = await this.entity.findOneBy(options);

      if (!entity) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return entity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findOneByCondition(condition: FindOptionsWhere<T>): Promise<T> {
    try {
      const entity = await this.entity.findOneBy(condition);

      if (!entity) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return entity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findAllByCondition(
    options: FindOptionsWhere<T>,
    offset?: number,
    limit?: number,
  ): Promise<T[]> {
    try {
      const entities = await this.entity.findBy(options);

      if (!entities.length) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      if (offset && limit) {
        return entities.slice(offset, offset + limit);
      }
      return entities;
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
      const entity = await this.entity.findOne(filterCondition);
      if (!entity) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return entity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findAllWithCondition(
    filterCondition: FindManyOptions<T>,
    offset?: number,
    limit?: number,
  ): Promise<T[]> {
    try {
      const entities = await this.entity.find(filterCondition);
      if (!entities.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }
      if (offset && limit) {
        return entities.slice(offset, offset + limit);
      }
      return entities;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(
    offset?: number,
    limit?: number,
    options?: FindManyOptions<T>,
  ): Promise<T[]> {
    try {
      const entities = await this.entity.find(options);
      if (!entities.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }
      if (offset && limit) {
        return entities.slice(offset, offset + limit);
      }
      return entities;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  /*Method:  Patch */
  public async updateOneByIdSoft(
    id: any,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };

    try {
      const entity = await this.entity.findOneBy(options);

      if (!entity) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      const updateResult: UpdateResult = await this.entity.update(id, data);
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

  /*Method:  Put */
  public async updateOneByIdHard(
    id: any,
    data: QueryDeepPartialEntity<T>,
  ): Promise<InsertResult> {
    try {
      const insertResult: InsertResult = await this.entity.upsert([data], {
        conflictPaths: [id],
        skipUpdateIfNoValuesChanged: true, // supported by postgres, skips update if it would not change row values
      });
      return insertResult;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /*Method:  Put */
  public async updateManyHard(
    param: any[],
    data: QueryDeepPartialEntity<T>[],
  ): Promise<InsertResult> {
    try {
      const insertResult: InsertResult = await this.entity.upsert(data, {
        conflictPaths: param,
        skipUpdateIfNoValuesChanged: true, // supported by postgres, skips update if it would not change row values
      });
      return insertResult;
    } catch (error) {
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

      return await this.entity.remove(entityToRemove);
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

      return await this.entity.remove(entityToRemove);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }

  public async removeAll(): Promise<void> {
    try {
      await this.entity.createQueryBuilder().delete().execute();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    try {
      return await this.entity.preload(entityLike);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public serialize(entity: T): Record<string, any> {
    return instanceToPlain(entity);
  }
}
