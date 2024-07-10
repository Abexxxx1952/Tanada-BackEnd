import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsObject, IsOptional } from 'class-validator';
import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
} from 'typeorm';

import { FindPhotoByConditionsDto } from '../../dto/findByConditions.dto';
import { FindOnePhotoWithConditionsDto } from '../../dto/findWithConditions.dto';
import { FindPhotoByConditionsGqlInput } from './findPhotoByConditions.input';
import { PhotoOrderObjectGqlInput } from './orderObject.input';

@InputType()
export class FindOnePhotoWithConditionsGqlInput
  implements FindOnePhotoWithConditionsDto
{
  @Field(() => [FindPhotoByConditionsGqlInput], { nullable: true })
  @IsOptional()
  @IsObject()
  readonly where?: FindPhotoByConditionsDto | FindPhotoByConditionsDto[];

  @Field(() => FindPhotoByConditionsGqlInput, { nullable: true })
  @IsOptional()
  @IsArray()
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @Field(() => PhotoOrderObjectGqlInput, { nullable: true })
  @IsOptional()
  @IsObject()
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @Field(() => FindPhotoByConditionsGqlInput, { nullable: true })
  @IsOptional()
  @IsArray()
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;
}
