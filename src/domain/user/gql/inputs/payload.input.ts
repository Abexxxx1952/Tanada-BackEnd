import { Field, InputType } from '@nestjs/graphql';
import { Payload } from '../../types/payload';

@InputType('PayloadInput')
export class PayloadGqlInput implements Payload {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: string;
}
