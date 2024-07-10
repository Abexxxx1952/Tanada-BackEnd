import { Field, InputType } from '@nestjs/graphql';
import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
} from 'typeorm';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { FindUserByConditionsDto } from '../../dto/findByConditions.dto';
import { FindOneUserWithConditionsDto } from '../../dto/findWithConditions.dto';
import { FindUserByConditionsGqlInput } from './findUserByConditions.input';
import { UserOrderObjectGqlInput } from './orderObject.input';

@InputType()
export class FindOneUserWithConditionsGqlInput
  implements FindOneUserWithConditionsDto
{
  @Field(() => FindUserByConditionsGqlInput, { nullable: true })
  @IsOptional()
  @IsObject()
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @Field(() => FindUserByConditionsGqlInput, { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @Field(() => UserOrderObjectGqlInput, { nullable: true })
  @IsOptional()
  @IsObject()
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @Field(() => FindUserByConditionsGqlInput, { nullable: true })
  @IsOptional()
  @IsArray()
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;
}
