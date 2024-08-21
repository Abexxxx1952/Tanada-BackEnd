import { ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';
import {
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';
import { FindPhotoByConditionsDto } from '../../domain/photo/dto/findByConditions.dto';
import { FindUserByConditionsDto } from '../../domain/user/dto/findByConditions.dto';
import { PhotoModel } from '../photo/types/photo';
import { PhotoEntity } from '../../domain/photo/entity/photo.entity';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { PhotoStatEntity } from '../../domain/stat/entity/photoStat.entity';
import { UserModel } from '../user/types/user';
import { PhotoStatModel } from '../stats/types/photoStats';

class FindUserByConditions implements FindUserByConditionsDto {
  @ApiPropertyOptional()
  readonly id?: string;
  @ApiPropertyOptional()
  readonly name?: string;
  @ApiPropertyOptional()
  readonly email?: string;
  @ApiPropertyOptional()
  readonly icon?: string;
  @ApiPropertyOptional()
  readonly createdAt?: Date;
  @ApiPropertyOptional()
  readonly updatedAt?: Date;
  @ApiPropertyOptional({ type: () => PhotoModel })
  readonly photo?: PhotoEntity[];
}

class FindPhotoByConditions implements FindPhotoByConditionsDto {
  @ApiPropertyOptional()
  readonly id?: number;
  @ApiPropertyOptional()
  readonly link?: string;
  @ApiPropertyOptional()
  readonly createdAt?: Date;
  @ApiPropertyOptional()
  readonly updatedAt?: Date;
  @ApiPropertyOptional({ type: () => UserModel })
  readonly user?: UserEntity;
  @ApiPropertyOptional({ type: () => PhotoStatModel })
  readonly stats?: PhotoStatEntity;
}

type FindOptionsOrderValue =
  | 'ASC'
  | 'DESC'
  | 'asc'
  | 'desc'
  | 1
  | -1
  | {
      direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
      nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
    };
class OrderUserByConditionsDto {
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly id?: FindOptionsOrderValue;
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly name?: FindOptionsOrderValue;
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly email?: FindOptionsOrderValue;
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly icon?: FindOptionsOrderValue;
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly createdAt?: FindOptionsOrderValue;
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly updatedAt?: FindOptionsOrderValue;
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly photo?: FindOptionsOrderValue[];
}

class OrderPhotoByConditionsDto {
  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly id?: FindOptionsOrderValue;

  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly link?: FindOptionsOrderValue;

  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly createdAt?: FindOptionsOrderValue;

  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly updatedAt?: FindOptionsOrderValue;

  @ApiPropertyOptional({
    type: 'string',
    enum: [
      'ASC',
      'DESC',
      'asc',
      'desc',
      1,
      -1,
      { direction: 'asc' },
      { direction: 'desc' },
      { direction: 'ASC' },
      { direction: 'DESC' },
      { nulls: 'first' },
      { nulls: 'last' },
      { nulls: 'FIRST' },
      { nulls: 'LAST' },
    ],
  })
  readonly user?: FindOptionsOrderValue;
}

export class FindOneUserWithConditionsDto
  implements FindOneOptions<FindUserByConditionsDto>
{
  @ApiPropertyOptional({ type: () => FindUserByConditions })
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @ApiPropertyOptional({
    type: FindUserByConditions,
  })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @ApiPropertyOptional({
    type: FindUserByConditions,
  })
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      enum: ['photo'],
    },
  })
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;
}

export class FindAllUsersWithConditionsDto
  implements FindManyOptions<FindUserByConditionsDto>
{
  @ApiPropertyOptional({
    oneOf: [
      { type: 'object', $ref: getSchemaPath(FindUserByConditions) },
      {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(FindUserByConditions),
        },
      },
    ],
  })
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @ApiPropertyOptional({ type: FindUserByConditions })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @ApiPropertyOptional({
    type: OrderUserByConditionsDto,
  })
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      enum: ['photo'],
    },
  })
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;

  @ApiPropertyOptional({ example: 1 })
  readonly skip?: number;

  @ApiPropertyOptional({ example: 8 })
  readonly take?: number;
}

export class FindOnePhotoWithConditionsDto
  implements FindOneOptions<FindPhotoByConditions>
{
  @ApiPropertyOptional({ type: () => FindPhotoByConditions })
  readonly where?: FindPhotoByConditions | FindPhotoByConditions[];

  @ApiPropertyOptional({ type: FindPhotoByConditions })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditions>
    | FindOptionsSelectByString<FindPhotoByConditions>;

  @ApiPropertyOptional({
    type: FindPhotoByConditions,
  })
  readonly order?: FindOptionsOrder<FindPhotoByConditions>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      enum: ['user'],
    },
  })
  readonly relations?: FindOptionsRelations<FindPhotoByConditions>;
}

export class FindAllPhotosWithConditionsDto
  implements FindManyOptions<FindPhotoByConditions>
{
  @ApiPropertyOptional({
    oneOf: [
      { type: 'object', $ref: getSchemaPath(FindPhotoByConditions) },
      {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(FindPhotoByConditions),
        },
      },
    ],
  })
  readonly where?: FindPhotoByConditions | FindPhotoByConditions[];

  @ApiPropertyOptional({ type: FindPhotoByConditions })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditions>
    | FindOptionsSelectByString<FindPhotoByConditions>;

  @ApiPropertyOptional({
    type: OrderPhotoByConditionsDto,
  })
  readonly order?: FindOptionsOrder<FindPhotoByConditions>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      enum: ['user'],
    },
  })
  readonly relations?: FindOptionsRelations<FindPhotoByConditions>;

  @ApiPropertyOptional({ example: 1 })
  readonly skip?: number;

  @ApiPropertyOptional({ example: 8 })
  readonly take?: number;
}
