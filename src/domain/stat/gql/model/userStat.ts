import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserStatEntity } from '../../entity/userStat.entity';

@ObjectType('UserStatModel')
export class UserStatGqlModel implements UserStatEntity {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
