import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { FindPhotoByConditionsDto } from './findByConditions.dto';
import {
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';
import { ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';

export class FindOnePhotoWithConditionsDto
  implements FindOneOptions<FindPhotoByConditionsDto>
{
  @IsOptional()
  @IsObject()
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

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: FindPhotoByConditionsDto })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: Object })
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: [String] })
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;
}

export class FindAllPhotoWithConditionsDto
  implements FindManyOptions<FindPhotoByConditionsDto>
{
  @IsOptional()
  @IsObject()
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

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: FindPhotoByConditionsDto })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: Object })
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional({ type: [String] })
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly skip?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly take?: number;
}
