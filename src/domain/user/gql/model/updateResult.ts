import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { UpdateResult } from '../../../../database/abstractRepository/types/updateResult';

@ObjectType('UpdateUserResultModel')
export class UpdateUserResultGqlModel implements UpdateResult {
  @Field(() => [GraphQLJSONObject])
  raw: any;
  @Field(() => Int, { nullable: true })
  affected?: number;
  @Field(() => [GraphQLJSONObject])
  generatedMaps: {
    [key: string]: any;
  }[];
}
