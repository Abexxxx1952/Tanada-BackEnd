import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { FindUserByConditionsDto } from '../../dto/findByConditions.dto';
import { PhotoGqlInput } from '../../../photo/gql/inputs/photo.input';

@InputType()
export class FindUserByConditionsGqlInput implements FindUserByConditionsDto {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  readonly id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly icon?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  @Field(() => [PhotoGqlInput], { nullable: true })
  @IsOptional()
  @IsArray()
  readonly photo?: PhotoGqlInput[];
}
