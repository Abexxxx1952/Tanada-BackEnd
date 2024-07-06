import { ArgsType, Field } from '@nestjs/graphql';
import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
} from 'typeorm';
import { FindUserByConditionsDto } from '../../dto/findByConditions.dto';
import { FindOneUserWithConditionsDto } from '../../dto/findWithConditions.dto';
import { FindUserByConditionsGqlInput } from '../inputs/findUserByConditions.input';
import { UserOrderObjectGqlInput } from '../inputs/orderObject.input';

@ArgsType()
export class FindOneUserWithConditionsGqlArgs
  implements FindOneUserWithConditionsDto
{
  @Field(() => [FindUserByConditionsGqlInput], { nullable: true })
  readonly where?: FindUserByConditionsDto | FindUserByConditionsDto[];

  @Field(() => FindUserByConditionsGqlInput, { nullable: true })
  readonly select?:
    | FindOptionsSelect<FindUserByConditionsDto>
    | FindOptionsSelectByString<FindUserByConditionsDto>;

  @Field(() => UserOrderObjectGqlInput, { nullable: true })
  readonly order?: FindOptionsOrder<FindUserByConditionsDto>;

  @Field(() => FindUserByConditionsGqlInput, { nullable: true })
  readonly relations?: FindOptionsRelations<FindUserByConditionsDto>;
}
