import { ArgsType, Field } from '@nestjs/graphql';
import { PayloadGqlInput } from '../inputs/payload.input';
import { UpdateUserDto } from '../../dto/update.dto';

@ArgsType()
export class UpdateUserGqlArgs implements UpdateUserDto {
  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly password?: string;

  @Field({ nullable: true })
  readonly icon?: string;

  @Field(() => PayloadGqlInput, { nullable: true })
  readonly payload?: Record<string, string>[];
}
