import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { PayloadGqlInput } from '../inputs/payload.input';
import { UpdateUserDto } from '../../dto/update.dto';
import { Payload } from '../../types/payload';

@ArgsType()
export class UpdateUserGqlArgs implements UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly icon?: string;

  @Field(() => [PayloadGqlInput], { nullable: true })
  @IsOptional()
  @IsArray()
  readonly payload?: Payload[];
}
