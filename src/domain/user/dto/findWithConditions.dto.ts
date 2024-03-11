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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindOneUserWithConditionsDto
  implements FindOneOptions<FindUserByConditionsDto>
{
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional()
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;
}

export class FindAllUserWithConditionsDto
  implements FindManyOptions<FindUserByConditionsDto>
{
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional()
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @IsOptional()
  @ApiPropertyOptional()
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
