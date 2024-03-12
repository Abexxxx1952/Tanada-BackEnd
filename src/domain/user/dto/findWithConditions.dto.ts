import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { FindUserByConditionsDto } from './findByConditions.dto';
import {
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';
import { ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';

export class FindOneUserWithConditionsDto
  implements FindOneOptions<FindUserByConditionsDto>
{
  @IsOptional()
  @IsObject()
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

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: FindUserByConditionsDto })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: Object })
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: [String] })
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;
}

export class FindAllUserWithConditionsDto
  implements FindManyOptions<FindUserByConditionsDto>
{
  @IsOptional()
  @IsObject()
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

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: FindUserByConditionsDto })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: Object })
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: [String] })
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly skip?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly take?: number;
}
