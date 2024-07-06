import { ObjectType, Field } from '@nestjs/graphql';
import { Payload } from '../../types/payload';

@ObjectType('PayloadModel')
export class PayloadEGqlModel implements Payload {
  @Field()
  key: string;

  @Field()
  value: string;
}
