import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  UpdateResult,
  InsertResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: T): Promise<T>;
  saveMany(data: T[]): Promise<T[]>;
  findOneById(id: any): Promise<T>;
  findOneByCondition(condition: FindOptionsWhere<T>): Promise<T>;
  findAllByCondition(options: FindOptionsWhere<T>): Promise<T[]>;
  findOneWithCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findAllWithCondition(filterCondition: FindManyOptions<T>): Promise<T[]>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  updateOneByIdSoft(
    id: any,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult>;
  updateOneByIdHard(
    id: any,
    data: QueryDeepPartialEntity<T>,
  ): Promise<InsertResult>;
  updateManyHard(
    param: any[],
    data: QueryDeepPartialEntity<T>[],
  ): Promise<InsertResult>;
  removeAllByCondition(options: FindOptionsWhere<T>): Promise<T[]>;
  removeById(id: any): Promise<T>;
  removeAll(): Promise<void>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  serialize(entity: T): Record<string, any>;
}
