import { ArgsType, Field, Int } from '@nestjs/graphql';
import { FindPhotoByConditionsDto } from '../../dto/findByConditions.dto';
import { UserGqlInput } from '../../../user/gql/inputs/user.input';

@ArgsType()
export class FindPhotoByConditionsGqlArgs implements FindPhotoByConditionsDto {
  @Field(() => Int, { nullable: true })
  readonly id?: number;

  @Field({ nullable: true })
  readonly link?: string;

  @Field({ nullable: true })
  readonly createdAt?: Date;

  @Field({ nullable: true })
  readonly updatedAt?: Date;

  @Field(() => UserGqlInput, { nullable: true })
  readonly user?: UserGqlInput;
}
