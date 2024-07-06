import { ArgsType, Field } from '@nestjs/graphql';
import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsOrder,
  FindOptionsRelations,
} from 'typeorm';
import { FindPhotoByConditionsDto } from '../../dto/findByConditions.dto';
import { FindOnePhotoWithConditionsDto } from '../../dto/findWithConditions.dto';
import { FindPhotoByConditionsGqlInput } from '../inputs/findPhotoByConditions.input';
import { PhotoOrderObjectGqlInput } from '../inputs/orderObject.input';

@ArgsType()
export class FindOnePhotoWithConditionsGqlArgs
  implements FindOnePhotoWithConditionsDto
{
  @Field(() => [FindPhotoByConditionsGqlInput], { nullable: true })
  readonly where?: FindPhotoByConditionsDto | FindPhotoByConditionsDto[];

  @Field(() => FindPhotoByConditionsGqlInput, { nullable: true })
  readonly select?:
    | FindOptionsSelect<FindPhotoByConditionsDto>
    | FindOptionsSelectByString<FindPhotoByConditionsDto>;

  @Field(() => PhotoOrderObjectGqlInput, { nullable: true })
  readonly order?: FindOptionsOrder<FindPhotoByConditionsDto>;

  @Field(() => FindPhotoByConditionsGqlInput, { nullable: true })
  readonly relations?: FindOptionsRelations<FindPhotoByConditionsDto>;
}
