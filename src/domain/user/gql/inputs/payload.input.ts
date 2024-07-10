import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Payload } from '../../types/payload';

@InputType()
export class PayloadGqlInput implements Payload {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  key: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  value: string;
}
