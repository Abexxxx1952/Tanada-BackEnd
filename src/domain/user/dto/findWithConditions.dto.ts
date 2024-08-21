import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';
import { Type } from 'class-transformer';
import { FindUserByConditionsDto } from './findByConditions.dto';

type Direction = 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface OrderOptions {
  direction?: Omit<Direction, 1 | -1>;
  nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
}

type OrderObjectType = {
  [P in keyof FindUserByConditionsDto]: Direction | OrderOptions;
};

class OrderObject implements OrderObjectType {
  [key: string]: Direction | OrderOptions;
}
export class FindOneUserWithConditionsDto
  implements FindOneOptions<FindUserByConditionsDto>
{
  @IsOptional()
  @IsObject()
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @IsOptional()
  @IsObject()
  @Type(() => OrderObject)
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;
}

export class FindAllUserWithConditionsDto
  implements FindManyOptions<FindUserByConditionsDto>
{
  @IsOptional()
  @IsObject()
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @IsOptional()
  @IsObject()
  @Type(() => OrderObject)
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;

  @IsOptional()
  @IsNumber()
  readonly skip?: number;

  @IsOptional()
  @IsNumber()
  readonly take?: number;
}
