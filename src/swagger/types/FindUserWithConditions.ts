import { ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';
import { FindPhotoByConditionsDto } from 'src/domain/photo/dto/findByConditions.dto';
import { FindUserByConditionsDto } from 'src/domain/user/dto/findByConditions.dto';
import {
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';

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
  @ApiPropertyOptional({
    oneOf: [
      { type: 'object', $ref: getSchemaPath(FindUserByConditionsDto) },
      {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(FindUserByConditionsDto),
        },
      },
    ],
  })
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @ApiPropertyOptional({
    type: FindUserByConditionsDto,
  })
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
}

export class FindAllUserWithConditionsDto
  implements FindManyOptions<FindUserByConditionsDto>
{
  @ApiPropertyOptional({
    oneOf: [
      { type: 'object', $ref: getSchemaPath(FindUserByConditionsDto) },
      {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(FindUserByConditionsDto),
        },
      },
    ],
  })
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @ApiPropertyOptional({ type: FindUserByConditionsDto })
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
  implements FindOneOptions<FindPhotoByConditionsDto>
{
  @ApiPropertyOptional({
    oneOf: [
      { type: 'object', $ref: getSchemaPath(FindPhotoByConditionsDto) },
      {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(FindPhotoByConditionsDto),
        },
      },
    ],
  })
  readonly where?: FindPhotoByConditionsDto | FindPhotoByConditionsDto[];

  @ApiPropertyOptional({ type: FindPhotoByConditionsDto })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @ApiPropertyOptional({
    type: OrderPhotoByConditionsDto,
  })
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      enum: ['user'],
    },
  })
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;
}

export class FindAllPhotoWithConditionsDto
  implements FindManyOptions<FindPhotoByConditionsDto>
{
  @ApiPropertyOptional({
    oneOf: [
      { type: 'object', $ref: getSchemaPath(FindPhotoByConditionsDto) },
      {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(FindPhotoByConditionsDto),
        },
      },
    ],
  })
  readonly where?: FindPhotoByConditionsDto | FindPhotoByConditionsDto[];

  @ApiPropertyOptional({ type: FindPhotoByConditionsDto })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @ApiPropertyOptional({
    type: OrderPhotoByConditionsDto,
  })
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      enum: ['user'],
    },
  })
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;

  @ApiPropertyOptional({ example: 1 })
  readonly skip?: number;

  @ApiPropertyOptional({ example: 8 })
  readonly take?: number;
}
