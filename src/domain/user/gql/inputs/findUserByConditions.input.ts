import { Field, ID, InputType } from '@nestjs/graphql';
import { FindUserByConditionsDto } from '../../dto/findByConditions.dto';
import { PhotoGqlInput } from '../../../photo/gql/inputs/photo.input';

@InputType('FindUserByConditionsInput')
export class FindUserByConditionsGqlInput implements FindUserByConditionsDto {
  @Field(() => ID, { nullable: true })
  readonly id?: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly email?: string;

  @Field({ nullable: true })
  readonly icon?: string;

  @Field({ nullable: true })
  readonly createdAt?: Date;

  @Field({ nullable: true })
  readonly updatedAt?: Date;

  @Field(() => [PhotoGqlInput], { nullable: true })
  readonly photo?: PhotoGqlInput[];
}
