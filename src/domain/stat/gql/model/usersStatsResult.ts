import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UsersStatsResult } from '../../types/usersStatsResult';

@ObjectType('UsersStatsResultModel')
export class UsersStatsResultGqlModel implements UsersStatsResult {
  @Field(() => Int)
  created: number;

  @Field(() => Int)
  deleted: number;
}
