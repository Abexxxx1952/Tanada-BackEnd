import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findOneById(id: any): Promise<T>;
  findOneByCondition(condition: FindOptionsWhere<T>): Promise<T>;
  findAllByCondition(options: FindOptionsWhere<T>): Promise<T[]>;
  findOneWithCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findAllWithCondition(filterCondition: FindManyOptions<T>): Promise<T[]>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  updateOneById(
    id: any,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult>;
  removeAllByCondition(options: FindOptionsWhere<T>): Promise<T[]>;
  removeById(id: any): Promise<T>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  serialize(entity: T): Record<string, any>;
}
