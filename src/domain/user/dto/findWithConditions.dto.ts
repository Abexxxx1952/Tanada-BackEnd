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

export class FindOneWithConditionsDto
  implements FindOneOptions<FindByConditionsDto>
{
  @IsObject()
  @IsOptional()
  readonly where?: FindByConditionsDto | FindByConditionsDto[];

  @IsString({ each: true })
  @IsOptional()
  readonly select?:
    | FindOptionsSelect<FindByConditionsDto>
    | FindOptionsSelectByString<FindByConditionsDto>;

  @IsOptional()
  readonly order?: FindOptionsOrder<FindByConditionsDto>;

  @IsOptional()
  readonly relations?: FindOptionsRelations<FindByConditionsDto>;
}

export class FindAllWithConditionsDto
  implements FindManyOptions<FindByConditionsDto>
{
  @IsObject()
  @IsOptional()
  readonly where?: FindByConditionsDto | FindByConditionsDto[];

  @IsString({ each: true })
  @IsOptional()
  readonly select?:
    | FindOptionsSelect<FindByConditionsDto>
    | FindOptionsSelectByString<FindByConditionsDto>;

  @IsOptional()
  readonly order?: FindOptionsOrder<FindByConditionsDto>;

  @IsOptional()
  readonly relations?: FindOptionsRelations<FindByConditionsDto>;

  @IsOptional()
  @IsNumber()
  readonly skip?: number;

  @IsOptional()
  @IsNumber()
  readonly take?: number;
}
