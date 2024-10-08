import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { validate } from 'class-validator';
import { BaseInterfaceRepository } from './base.interface.repository';

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
      throw new InternalServerErrorException(error.message);
    }
  }
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    try {
      const entities = await this.entity.save(data);
      return entities;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: any): Promise<T> {
    const condition: FindOptionsWhere<T> = {
      id: id,
    };

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
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllByCondition(
    condition: FindOptionsWhere<T>,
    offset?: number,
    limit?: number,
  ): Promise<T[]> {
    try {
      const entities = await this.entity.findBy(condition);

      if (!entities.length) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      const actualOffset = offset ?? 0;
      const actualLimit = limit ?? entities.length;

      return entities.slice(actualOffset, actualOffset + actualLimit);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneWithCondition(condition: FindOneOptions<T>): Promise<T> {
    try {
      const entity = await this.entity.findOne(condition);
      if (!entity) {
        throw new NotFoundException(`${this.entityName} not found`);
      }
      return entity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllWithCondition(
    condition: FindManyOptions<T>,
  ): Promise<T[]> {
    try {
      const entities = await this.entity.find(condition);
      if (!entities.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }

      return entities;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(condition?: FindManyOptions<T>): Promise<T[]> {
    try {
      const entities = await this.entity.find(condition);
      if (!entities.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }

      return entities;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  /*Method:  Patch */
  public async updateOneByIdSoft(
    id: any,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const condition: FindOptionsWhere<T> = {
      id: id,
    };

    try {
      const entity = await this.entity.findOneBy(condition);

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

      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateOneByIdHard(id: any, data: DeepPartial<T>): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };

    try {
      const entityToUpdate: T = await this.entity.findOneBy(options);
      if (entityToUpdate) {
        Object.assign(entityToUpdate, data);
        return await this.save(entityToUpdate);
      }

      const entity: T = this.create(data);
      return await this.entity.save(entity);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async removeAllByCondition(
    condition: FindOptionsWhere<T>,
  ): Promise<T[]> {
    try {
      const entityToRemove = await this.findAllByCondition(condition);
      if (!entityToRemove.length) {
        throw new NotFoundException(`${this.entityName}s not found`);
      }

      return await this.entity.remove(entityToRemove);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  public async removeById(id: any): Promise<T> {
    try {
      const entityToRemove = await this.findOneById(id);

      if (!entityToRemove) {
        throw new NotFoundException(`${this.entityName} not found`);
      }

      await this.entity.remove({ ...entityToRemove });

      return entityToRemove;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }
  public serialize(entity: T): Record<string, any> {
    return instanceToPlain(entity);
  }

  public async parsedCondition<T extends object>(
    condition: { condition: string },
    DTO: new () => T,
  ): Promise<T> {
    let parsedCondition: T;
    try {
      parsedCondition = JSON.parse(condition.condition);
    } catch (error) {
      throw new BadRequestException('Invalid JSON format');
    }
    try {
      parsedCondition = plainToInstance(DTO, parsedCondition);
      const errors = await validate(parsedCondition);
      if (errors.length > 0) {
        throw new BadRequestException(
          'Validation failed: ' + errors.toString(),
        );
      }
    } catch (error) {
      throw error;
    }
    return parsedCondition;
  }
}
