import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { FindByConditionsDto } from './findByConditions.dto';
import {
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindOneWithConditionsDto
  implements FindOneOptions<FindByConditionsDto>
{
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  readonly where?: FindByConditionsDto | FindByConditionsDto[];

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional()
  readonly select?:
    | FindOptionsSelect<FindByConditionsDto>
    | FindOptionsSelectByString<FindByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
  readonly order?: FindOptionsOrder<FindByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
  readonly relations?: FindOptionsRelations<FindByConditionsDto>;
}

export class FindAllWithConditionsDto
  implements FindManyOptions<FindByConditionsDto>
{
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  readonly where?: FindByConditionsDto | FindByConditionsDto[];

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional()
  readonly select?:
    | FindOptionsSelect<FindByConditionsDto>
    | FindOptionsSelectByString<FindByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
  readonly order?: FindOptionsOrder<FindByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
  readonly relations?: FindOptionsRelations<FindByConditionsDto>;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly skip?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly take?: number;
}
