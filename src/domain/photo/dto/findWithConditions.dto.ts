import {
  FindOneOptions,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
  FindManyOptions,
} from 'typeorm';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { FindPhotoByConditionsDto } from './findByConditions.dto';
import { Type } from 'class-transformer';

type Direction = 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface OrderOptions {
  direction?: Omit<Direction, 1 | -1>;
  nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
}

type OrderObjectType = {
  [P in keyof FindPhotoByConditionsDto]: Direction | OrderOptions;
};

class OrderObject implements OrderObjectType {
  [key: string]: Direction | OrderOptions;
}

export class FindOnePhotoWithConditionsDto
  implements FindOneOptions<FindPhotoByConditionsDto>
{
  @IsOptional()
  @IsObject()
  readonly where?: FindPhotoByConditionsDto | FindPhotoByConditionsDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @IsOptional()
  @IsObject()
  @Type(() => OrderObject)
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;
}

export class FindAllPhotoWithConditionsDto
  implements FindManyOptions<FindPhotoByConditionsDto>
{
  @IsOptional()
  @IsObject()
  readonly where?: FindPhotoByConditionsDto | FindPhotoByConditionsDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @IsOptional()
  @IsObject()
  @Type(() => OrderObject)
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;

  @IsOptional()
  @IsNumber()
  readonly skip?: number;

  @IsOptional()
  @IsNumber()
  readonly take?: number;
}
